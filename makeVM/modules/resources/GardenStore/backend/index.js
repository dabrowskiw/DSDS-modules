const express = require("express");
const pool = require("./Database/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// middleware to check for errors and display them

app.use(
  (err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//to use cookies within middleware
app.use(cookieParser());

/**
 * Products endpoints
 */
app.get("/products/:id", isLoggedIn, async (req,res) =>{
  try {
    const sqlQuery = 'SELECT * FROM products WHERE product_id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/products", isLoggedIn, async (req,res)=>{
  try {
    const sqlQuery = 'SELECT * FROM products';
    const rows = await pool.query(sqlQuery);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

/**
 * Comments endpoints
 */
app.get("/comments/:id", isLoggedIn, async (req,res) => {
  try {
    const sqlQuery = 'SELECT comment_id, author, text, created_at, product_id FROM comments WHERE product_id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.get("/comments", isLoggedIn, async (req,res)=>{
  try {
    const sqlQuery = 'SELECT * FROM comments';
    const rows = await pool.query(sqlQuery);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post("/comments", isLoggedIn, async (req,res) => {
  try {
    const payload = req.body;
    const comment_id = crypto.randomUUID(); // >node v v15.6.0 
    const sqlQuery = 'INSERT INTO comments (comment_id, author, text, product_id) VALUES (?,?,?,?)';
    const result = await pool.query(sqlQuery, [comment_id, payload.author, payload.text, payload.product_id]);
    res.status(200);  
    return res.json({message: "comment created successfully"});
  } catch (error) {
    res.status(400).send(error);
  }
})
/**
 * Login & logout endpoints & helper functions
 */

app.post("/login", async (req,res) =>{
  const payload = req.body;
  const sessionId = await login(payload.email, payload.password);
  if(!sessionId){
    res.status(401);  //401 -> unauthorized
    return res.json({ message: "Wrong Email or Password."})
  }
  res.cookie("session", sessionId,{
    // httpOnly: true,  //uncomment to prevent XSS attack if browser accepts httpOnly header
    sameSite: "none",  //none = sent cookies in all contexts, 1st party and XS requests
    secure: true  //only allow secure sending of cookies - only encrypted req allowed
  });
  res.status(200);
  return res.json({status:200, sessionId: sessionId});
})

async function login(email, password){
  const isPasswordCorrect = await checkPw(email, password);
  if(isPasswordCorrect){
    const session_id = crypto.randomUUID(); // >node v15.6.0 
    const sqlQuery = 'INSERT INTO sessions (session_id, email) VALUES (?,?)';
    const result = await pool.query(sqlQuery, [session_id, email]);
    return session_id;
  }
  return undefined;
}

app.post("/logout", async (req,res) => {
  const sessionCookie = req.cookies.session;
  res.clearCookie('session');
  res.status(200);
  const sqlQuery = 'DELETE FROM sessions WHERE session_id=?';
  await pool.query(sqlQuery, [sessionCookie]);
  return res.json({message: "Successfully logged out."});
})

async function checkPw(email, password){
  try {
    const sqlQuery = 'SELECT email, password FROM user WHERE email=?';
    const rows = await pool.query(sqlQuery, email);
    return bcrypt.compare(password, rows[0].password);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function isLoggedIn(req, res, next){
  const sessionCookie = req.cookies.session;
  if(!sessionCookie){
    res.status(401);
    return res.json({ message: "Authentication Error: Are you logged in?"});
  }
  let email;
  if(sessionCookie != null){
    try {
      const sqlQuery = 'SELECT session_id, email FROM sessions WHERE session_id=?';
      const rows = await pool.query(sqlQuery, sessionCookie);
      email = rows[0].email;
    } catch (error) {
      return res.send(error.message);
    }
  }else email = null;

  if (!email){
    res.status(401);
  }
  next();
}

/**
 * Users endpoints
 */

// get only username of logged user
app.get("/users", isLoggedIn, async (req, res) => {
  try{
  const sessionCookie = req.cookies.session;
  const sqlQuery = 'SELECT session_id, email FROM sessions WHERE session_id=?';
  const rows = await pool.query(sqlQuery, sessionCookie);
  email = rows[0].email;
  const sqlQuery2 = 'SELECT username FROM user WHERE email=?';
  const rows2 = await pool.query(sqlQuery2, email);
  return res.status(200).send(rows2[0]);
  }catch(error){
    res.status(400).send(error.message);
  }
})

// get full user profile
app.get("/userprofile", isLoggedIn, async (req,res) => {
  try{
    const sessionCookie = req.cookies.session;
    const sqlQuery = 'SELECT session_id, email FROM sessions WHERE session_id=?';
    const rows = await pool.query(sqlQuery, sessionCookie);
    email = rows[0].email;
    const sqlQuery2 = 'SELECT * FROM user WHERE email=?';
    const rows2 = await pool.query(sqlQuery2, email);
    return res.status(200).send(rows2[0]);
    }catch(error){
      res.status(400).send(error.message);
    }
})

// creates user with salted password hash and adds it to db
app.post("/users", async (req,res) => {
  try {
    const {username, pw, iban, address, email} = req.body;
    const user_id = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(pw,salt);
    const sqlQuery = 'INSERT INTO user (username, password, iban, address, email, user_id) VALUES (?,?,?,?,?,?)';
    const result = await pool.query(sqlQuery, [username, password, iban, address, email, user_id]);
    console.log(result);
    return res.status(200).json({status:200, message: "user created successfully"});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.delete("/users/:id", (req,res) =>{
  try{ 
    pool.query('DELETE FROM user where user_id=?', req.params.id);
    res.status(204).send("user deleted sucessfully");
  } catch (error){
    res.status(400).send(error.message);
  }
})

/** Start listening */
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});