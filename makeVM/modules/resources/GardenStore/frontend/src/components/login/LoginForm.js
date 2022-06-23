import React, { useState } from "react";
import "../styles.css";
import Header from "../structure/Header";
import { useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';
//import logo from "";

import Footer from "../structure/Footer"

const LoginForm = (props) => {

  let navigate = useNavigate();

  const BASE_URL = props.baseUrl;
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };
  const passChangeHandler = (event) => {
    setEnteredPass(event.target.value);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const errors = {
    pass: "Invalid password"
  };

  const clickHandler = () => {
    var tableData = {
      email: enteredMail,
      password: enteredPass,
    };

    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      //Sicherheitsvorkehrung: Strict-Transport-Security: max-age=31536000; includeSubDomains
      body: JSON.stringify(tableData),
    };
    fetch(`${BASE_URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          props.onTryLogin(true);
          navigate('/landingPage');
          return true;
        } else {
          setErrorMessages({ name: "pass", message: errors.pass });
          props.onTryLogin(false);
          alert('Please try again! '+ res.message);
          return false;
        }
      });
  };

  return (
    <div className="container">
      <Header loggedIn={props.loggedIn}
        user={props.user} />
      <main>
        <div className="row justify-content-center">
          <div className="col-11 col-sm-6 shadow-0 border rounded-3 py-2">
            <div className="login">
              <h3 className="title">Sign In</h3>
              <form className="d-grid gap-2">
                <div className="form-group d-grid gap-2">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={mailChangeHandler}/>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={passChangeHandler}/>
                </div>
                <button type="button" className="btn btn-success btn-md my-3" onClick={clickHandler}>Submit</button>
              </form>
            </div>
            <div className="d-grid gap-2 text-center border-top pt-2 mt-2">
              New to Gardeningstore?
              <button type="button" className="btn btn-primary mb-3" onClick={() => navigate(`/register`)}>Create your account</button>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </div >

  );//return
};//function

export default LoginForm;
