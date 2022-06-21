import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import '../styles.css';
import _ from "lodash";
import { useNavigate, useParams } from 'react-router';
import Header from "../structure/Header"
import Footer from "../structure/Footer"


const Profile = (props) => {

    const BASE_URL = props.baseUrl;

    let navigate = useNavigate();

    //if logged in
    if (!props.loggedIn) {
        //navigate("/");
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState([]);

    const path = window.location.pathname;

    const { id } = useParams(); //gets id from current route

    useEffect(() => {
        let mounted = true;

        setTimeout(() => {
            async function getProfile() {
                fetch(`${BASE_URL}/userprofile`, {
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

        return () => (mounted = false); //cleanup function
    }, [profile, BASE_URL, navigate, path, props.logged]);

    const logout = () => {
        props.onLogout();
    };

    return (
        <div>
            <div className="container">
                <Header loggedIn={props.loggedIn}
        user={props.user} />
                <main>
                <i className="bi-alarm"></i>
                <i className="bi-alarm"></i>
                    {!isLoaded ? (<div className="loading-screen">Loading profile...</div>) : (
                        (!_.isEmpty(profile)) ? (
                            
                            <table className="table table-hover table-striped w-auto border">
                                <tbody>
                                    <tr>
                                        <th scope="row">Username</th>
                                        <td>{profile.username}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">E-Mail</th>
                                        <td>{profile.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Products in Cart</th>
                                        <td>{profile.cart_amount}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Bank-Account</th>
                                        <td>{profile.iban}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Adress</th>
                                        <td>{profile.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Member since</th>
                                        <td>{profile.created_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (<p className="message">No profile found.</p>))}
                </main>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Profile;