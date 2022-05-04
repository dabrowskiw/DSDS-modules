import React, { useState } from "react";
import "../styles.css";
import { useNavigate } from 'react-router';
//import logo from "";

import Header from "../structure/Header"
import Footer from "../structure/Footer"
import List from "../product/List"

const LandingPage = (props) => {

    let navigate = useNavigate();
    //connect Frontend to Backend
    //const BASE_URL = "https://travelsitebackend.herokuapp.com";


    const BASE_URL = props.baseUrl;

    return (
        <div>
            <Header />

            <div className="container">
                <main>
                    <h3>
                        Welcome at the LandingPage
                    </h3>
                    <div className="" >

                    </div>
                </main>
            </div>
            <List/>
            <Footer />
        </div>
    );//return
};//function

export default LandingPage;
