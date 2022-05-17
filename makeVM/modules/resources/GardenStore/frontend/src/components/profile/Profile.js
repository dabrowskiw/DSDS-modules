import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import '../styles.css';
import { useNavigate, useParams } from 'react-router';
import Header from "../structure/Header"
import Footer from "../structure/Footer"


const Profile = (props) => {

    /* {
        userName,
        email,
        password,
        iban,
        address,
        created_at
    } */

    const BASE_URL = "http://localhost:3001";

    let navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [profile, setProfile] = useState([]);

    const path = window.location.pathname;

    const { id } = useParams(); //gets id from current route

    useEffect(() => {
        let mounted = true;

        setTimeout(() => {
            async function getProfile() {
                fetch(`${BASE_URL}/profile/${id}`, {
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
                <Header />
                <main>
                    <Card>
                        <Card.Body>
                            <div>
                                <div>{profile.userName} </div>
                                <div>{profile.email} </div>
                                <div>{profile.password} </div>
                                <div>{profile.iban} </div>
                                <div>{profile.address} </div>
                                <div>{profile.created_at} </div>
                            </div>
                        </Card.Body>
                    </Card>
                </main>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Profile;