import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/login/LoginForm";
import LandingPage from "./components/landingPage/LandingPage";

function App() {

  const baseUrl = "";

  const [loggedIn, setLoggedIn] = useState(false);
  const loginTriedHandler = (result) => {
    setLoggedIn(result);
    // console.log("Login: " + result);
  };
  const logoutHandler = async () =>{
    setLoggedIn(false);
    const response = await fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log(response);
  }

  return (

    <BrowserRouter>
      <Routes>
      <Route
          exact
          path="/"
          element={<LoginForm 
            onTryLogin={loginTriedHandler}
           logged={loggedIn} 
           baseUrl={baseUrl}/>}
        />
      <Route
          exact
          path="/landingPage"
          element={<LandingPage />}
        />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
