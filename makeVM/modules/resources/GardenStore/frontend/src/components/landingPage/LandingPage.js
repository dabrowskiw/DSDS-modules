import React, { useState } from "react";
import "../styles.css";
import { useNavigate } from 'react-router';
//import logo from "";

import Header from "../structure/Header"
import Footer from "../structure/Footer"
import List from "../product/List"
import Detail from "../product/Detail"

const LandingPage = (props) => {

    let navigate = useNavigate();

    return (
        <div className="container">
            <Header loggedIn={props.loggedIn}
        user={props.user} />
            <main>
                <List
                baseUrl={props.baseUrl} />
            </main>
            <Footer />
        </div>
    );//return
};//function

export default LandingPage;
