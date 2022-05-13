import React, { useState } from "react";
import "../styles.css";
import { useNavigate } from 'react-router';
//import logo from "";

import Footer from "../structure/Footer"

const LoginForm = (props) => {

  let navigate = useNavigate();
  //connect Frontend to Backend
  //const BASE_URL = "https://travelsitebackend.herokuapp.com";


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
    pass: "invalid password"
  };

  const clickHandler = () => {
    var mail = enteredMail;
    var password = enteredPass;
    var tableData = {
      email: mail,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tableData),
    };
    fetch(`${BASE_URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === "200") {
          props.onTryLogin(true);
          navigate('/map');
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
      <header className="after-login">
        <div className="menu-container">
          <h2>Gardeningstore</h2>
        </div>
      </header>
      <main>
        <div className="row justify-content-center">
          <div className="col-11 col-sm-6 shadow-0 border rounded-3">
            <div className="login">
              <h3 className="title">Sign In</h3>
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
              <button type="submit" class="btn btn-primary my-4">Submit</button>
            </form>
          </div>
        </div>
    </div>
      </main >
  <Footer />
    </div >

  );//return
};//function

export default LoginForm;
