import React, { useState } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/login/LoginForm";
import LandingPage from "./components/landingPage/LandingPage";
import DetailPage from "./components/product/Detail";
import Profile from "./components/profile/Profile";

function App() {

  const baseUrl = "";
  // const baseUrl = "http://localhost:5000";

  const [loggedIn, setLoggedIn] = useState(false);
  const loginTriedHandler = (result) => {
    setLoggedIn(result);
    // console.log("Login: " + result);
  };
  const logoutHandler = async () => {
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
            baseUrl={baseUrl} />}
        />
        <Route
          exact
          path="/landingPage"
          element={<LandingPage />}
        />
        <Route
          exact
          path="/detailPage/:id"
          element={<DetailPage />}
          logged={loggedIn}
        />
        <Route
          exact
          path="/profile/:id"
          element={<Profile />}
          logged={loggedIn}
        />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
