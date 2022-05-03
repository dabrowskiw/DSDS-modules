import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles.css';
//import image from '../../images/globe.png'


const Header = (props) => {

    
    const logout = () =>{
        props.onLogout();
    }
    return (
        <header className="after-login">
            <div className="menu-container">
                {/* <img className="logo" alt='Logo' src={image}/> */}
                <h2><NavLink to={'/landingPage'}>Gardeningstore</NavLink></h2>
                <nav className="menu">
                    <ul>
                        <li><NavLink to={'/landingPage'} >Home</NavLink></li>
                        <li><NavLink to={'/profile'} >Profile</NavLink></li>
                        <li><NavLink to={'/'} onClick={logout} >Logout</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;