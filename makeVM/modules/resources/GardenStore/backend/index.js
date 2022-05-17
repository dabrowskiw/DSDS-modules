// import express, { NextFunction, Request, Response } from "express";
// import * as OpenApiValidator from "express-openapi-validator";       // use after cookie was stolen to validate api - prevention option
// import { HttpError } from "express-openapi-validator/dist/framework/types";   

const { resolveAny } = require("dns");
const express = require("express");
const pool = require("./db/database");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cookieParser());         // https://www.npmjs.com/package/cookie-parser
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
 * Request Routes
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

app.post("/comments", async (req,res) => {
  try {
    const {product_id, comment_id, author, text, rating} = req.body;
    const sqlQuery = 'INSERT INTO comments (product_id, comment_id, author, text, rating) VALUES (?,?,?,?,?)';
    const result = await pool.query(sqlQuery, [product_id, comment_id, author, text, rating]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

/** Start listening */
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});