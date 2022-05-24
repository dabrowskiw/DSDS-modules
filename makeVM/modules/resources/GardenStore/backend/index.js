const express = require("express");
const pool = require("./Database/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

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

/**
 * Products endpoints
 */
app.get("/products/:id", async (req,res) =>{
  try {
    const sqlQuery = 'SELECT product_id, name, price, description FROM products WHERE product_id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Comments endpoints
 */
app.get("/comments/:id", async (req,res) => {
  try {
    const sqlQuery = 'SELECT comm_id, author, text, rating, created_at, product_id FROM comments WHERE product_id=?';
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).send(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.post("/comments", async (req,res) => {
  try {
    const {product_id, author, text, rating} = req.body;
    const sqlQuery = 'INSERT INTO comments (product_id, author, text, rating) VALUES (?,?,?,?)';
    const result = await pool.query(sqlQuery, [product_id, author, text, rating]);
    console.log(result);
    res.status(200);   // TODO: request result throws error that big int can't be parsed 
    return res.json({message: "comment created successfully"});
  } catch (error) {
    res.status(400).send(error.message);
  }
})
/**
 * Login & logout endpoints
 */

app.post("/login", async (req,res) =>{
  const payload = req.body;
  const sessionId = await login(payload.email, payload.password);
  // console.log(sessionId);
  if(!sessionId){
    res.status(401);  //401 -> unauthorized
    return res.json({ message: "Wrong Email or Password."})
  }
  res.cookie("sessionCookie", sessionId,{
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
    const sessionId = crypto.randomUUID();
    return sessionId;
  }
  return undefined;
}

app.post("/logout", async (req,res) => {
  res.clearCookie('sessionCookie');
  res.status(200);
  return res.json({message: "Successfully logged out."});
})

// check salted & hashedPW with bcrypt
async function checkPw(email, password){
  try {
    const sqlQuery = 'SELECT email, password FROM users WHERE email=?';
    const rows = await pool.query(sqlQuery, email);
    return bcrypt.compare(password, rows[0].password);
  } catch (error) {
    return undefined;
  }
}

/**
 * Users endpoints
 */

// creates user with salted password hash and adds it to db
app.post("/users", async (req,res) => {
  try {
    const {username, plainpassword, iban, address, email} = req.body;
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(plainpassword, salt);
    const sqlQuery = 'INSERT INTO users (username, password, iban, address, email) VALUES (?,?,?,?,?)';
    const result = await pool.query(sqlQuery, [username, password, iban, address, email]);
    console.log(result);
    res.status(200);  
    return res.json({message: "user created successfully"});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

app.get("/users", async (req, res) => {
  
})

//optional: hash password of user

/** Start listening */
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});