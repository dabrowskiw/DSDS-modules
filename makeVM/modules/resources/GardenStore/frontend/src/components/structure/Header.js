import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from 'react-router';
import '../styles.css';

const Header = (props) => {

    let navigate = useNavigate();

    const [user, setUser] = useState([]);
    const BASE_URL = props.BASE_URL;

    const logout = () =>{
        props.onLogout();
    }
  
    return (
        <header>
            <div className="menu-container">
                {/* <img className="logo" alt='Logo' src={image}/> */}
                <h2><NavLink className="nav-link text-light" to={'/landingPage'}>Gardeningstore</NavLink></h2>
                <nav className="menu">
                    <ul className="nav">
                        <li className="nav-item"><NavLink className="nav-link text-light" to={'/landingPage'} ><Icon.House/> Home</NavLink></li>
                        {props.loggedIn ?
                            (<>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to='/' onClick={logout}><Icon.Lock/> Logout</NavLink></li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to={`/profile`}><Icon.Person/> Profile</NavLink></li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-light" to={`/profile`}><Icon.Cart/> My Shopping Cart: {props.user.cart_amount}</NavLink></li></>
                            ) : <li className="nav-item">
                                <NavLink className="nav-link text-light" to={'/'}><Icon.Lock/> Login</NavLink></li>}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;