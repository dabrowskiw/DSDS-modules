import React, {useState} from "react";
import "../styles.css";
import {useNavigate} from 'react-router';
//import logo from "";

const LoginForm = (props) => {

  let navigate = useNavigate();
  //connect Frontend to Backend
  //const BASE_URL = "https://travelsitebackend.herokuapp.com";
  

  const BASE_URL = props.baseUrl;
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPass, setEnteredPass] = useState("");

  const mailChangeHandler = (event) => {
    setEnteredMail(event.target.value);
  };
  const passChangeHandler = (event) => {
    setEnteredPass(event.target.value);
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
            props.onTryLogin(false);
            return false;
          }
        });
  };


return (
    <div className="container">
      <header className="index-header">
            <div className="header-container-index">
                {/* <img className="logo" alt="Logo" src={logo}/> */}
                <h1 className="index-title">Gardeningstore</h1>
            </div>
        </header>
        <main>
            <h3>
              Welcome
            </h3>
    <div className="login" >
      <label htmlFor="email">E-Mail</label>
      <input type="email" id="email" value={enteredMail} onChange={mailChangeHandler} />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="pw" onChange={passChangeHandler} />
      <div>
        <button type="submit" className="loginBtn" value={enteredPass} onClick={clickHandler}>
          Login
        </button>
      </div>
    </div>
    </main>
        <footer>
            © 2021
        </footer>
    </div>
  );//return
};//function

export default LoginForm;
