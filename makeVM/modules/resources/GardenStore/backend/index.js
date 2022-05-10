import express, { NextFunction, Request, Response } from "express";
// import * as OpenApiValidator from "express-openapi-validator";       // use after cookie was stolen to validate api
import { HttpError } from "express-openapi-validator/dist/framework/types";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
      origin: true,
    //   credentials: true,     // important when starting to implement credentials
    })
  );

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