import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginForm from "./components/login/LoginForm";
import Register from "./components/login/Register";
import LandingPage from "./components/landingPage/LandingPage";
import DetailPage from "./components/product/Detail";
import Profile from "./components/profile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const baseUrl = "http://localhost:8000";
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginHandler = (result) => {
    setLoggedIn(result);
  };

  const logoutHandler = async () => {
    setLoggedIn(false);
    await fetch(`${baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
    });
  }

  const path = window.location.pathname;

  useEffect(() => {
    let mounted = true;
    if (loggedIn) {
      setTimeout(() => {
        async function getProfile() {
          fetch(`${baseUrl}/userprofile`, {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then(
              (result) => {
                if (mounted) {
                  setProfile(result);
                }
              },
              (error) => {
                if (mounted) {
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
            onTryLogin={loginHandler}
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
            onLogout={logoutHandler}
          />}
        />
        <Route
          exact
          path="/detailPage/:id"
          element={<DetailPage
            loggedIn={loggedIn}
            baseUrl={baseUrl}
            user={profile}
            onLogout={logoutHandler}
          />}
        />
        <Route
          exact
          path="/profile"
          element={<Profile
            loggedIn={loggedIn}
            baseUrl={baseUrl}
            user={profile}
            onLogout={logoutHandler}
          />}
        />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
