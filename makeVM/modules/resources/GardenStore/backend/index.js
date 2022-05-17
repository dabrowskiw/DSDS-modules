// import express, { NextFunction, Request, Response } from "express";
// import * as OpenApiValidator from "express-openapi-validator";       // use after cookie was stolen to validate api - prevention option
// import { HttpError } from "express-openapi-validator/dist/framework/types";   

const express = require("express");
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
app.get("/products", async (req,res) =>{

});

/** Start listening */
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});