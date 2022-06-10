import React, { useState } from "react";
import "../styles.css";
import Header from "../structure/Header"
import Footer from "../structure/Footer"
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";
import bcrypt from 'bcryptjs'
//import logo from "";


const Register = (props) => {

  let navigate = useNavigate();

  const BASE_URL = props.baseUrl;
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const errors = {
    pass: "invalid password"
  };

  const clickHandler = () => {
    var username = enteredUsername;
    var mail = enteredMail;
    var hashedPassword = bcrypt.hashSync(enteredPass, '$2a$10$bd6Jl0V3pyjA5I.EPdd5wu');
    
    var tableData = {
      username: username,
      email: mail,
      password: hashedPassword,
    };

    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Sicherheitsvorkehrung: Strict-Transport-Security: max-age=31536000; includeSubDomains
      body: JSON.stringify(tableData),
    };
    fetch(`${BASE_URL}/register`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "200") {
          props.onTryLogin(true);
          navigate('/landingPage');
          return true;
        } else {
          setErrorMessages({ name: "pass", message: errors.pass });
          props.onTryLogin(false);
          return false;
        }
      });
  };

  return (
    <div className="container">
      <Header loggedIn={props.loggedIn}/>
      <main>
        <div className="row justify-content-center">
          <div className="col-11 col-sm-6 shadow-0 border rounded-3 py-2">
            <div className="login">
              <h3 className="title">Create your account</h3>
              <form className="d-grid gap-2">
                <div className="form-group d-grid gap-2">
                  <label htmlFor="username">Your Username</label>
                  <input type="text" className="form-control" id="name" autoComplete="off" />
                </div>
                <div className="form-group d-grid gap-2">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" autoComplete="off"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" autoComplete="off"/>
                </div>
                <button type="button" className="btn btn-success btn-md my-3" onClick={clickHandler}>Register</button>
              </form>
            </div>
            <div className="text-center border-top pt-2 mt-2">
                Already have an account? <Link to="/">Sign-In</Link>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >

  );//return
};//function

export default Register;
