import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/login/LoginForm";
import Register from "./components/login/Register";
import LandingPage from "./components/landingPage/LandingPage";
import DetailPage from "./components/product/Detail";
import Profile from "./components/profile/Profile";

function App() {

  const baseUrl = "http://localhost:8000";
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const path = window.location.pathname;

  useEffect(() => {
    let mounted = true;
    if (loggedIn) {
      setTimeout(() => {
        async function getProfile() {
          fetch(`${baseUrl}/users`, {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then(
              (result) => {
                if (mounted) {
                  setIsLoaded(true);
                  setProfile(result);
                }
              },
              (error) => {
                if (mounted) {
                  setIsLoaded(true);
                  setError(error);
                }
              }
            );
        } getProfile();
      }, 2000);
}
    return () => (mounted = false); //cleanup function
}, [profile, baseUrl, path, loggedIn]);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<LoginForm
            onTryLogin={loginTriedHandler}
            loggedIn={loggedIn}
            baseUrl={baseUrl}
          />}
        />
        <Route
          exact
          path="/register"
          element={<Register
            loggedIn={loggedIn}
            baseUrl={baseUrl}
          />}
        />
        <Route
          exact
          path="/landingPage"
          element={<LandingPage 
            loggedIn={loggedIn}
            baseUrl={baseUrl}
            user={profile}
          />}
        />
        <Route
          exact
          path="/detailPage/:id"
          element={<DetailPage
            loggedIn={loggedIn}
            baseUrl={baseUrl}
            user={profile}
          />}
        />
        <Route
          exact
          path="/profile"
          element={<Profile
            loggedIn={loggedIn}
            baseUrl={baseUrl}
            user={profile}
          />}
        />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
