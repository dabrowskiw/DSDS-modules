import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import '../styles.css';

const Header = (props) => {


    const [user, setUser] = useState([]);

    const logout = () => {
        props.onLogout();
    }
    return (
        <header className="after-login">
            <div className="menu-container">
                {/* <img className="logo" alt='Logo' src={image}/> */}
                <h2><NavLink className="nav-link text-light" to={'/landingPage'}>Gardeningstore</NavLink></h2>
                <nav className="menu">
                    <ul className="nav">
                        <li className="nav-item"><NavLink className="nav-link text-light" to={'/landingPage'} ><Icon.House/> Home</NavLink></li>
                        {!props.loggedIn ?
                            (<>
                                <li className="nav-item"><NavLink className="nav-link text-light" to={'/'} onClick={logout}><Icon.Lock/> Logout</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-light" to={`/profile/${user.id}`}><Icon.Person/> Profile</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link text-light" to={`/profile/${user.id}`}><Icon.Cart/> My Shopping Cart: {user.cartProducts}</NavLink></li></>
                            ) : <li className="nav-item"><NavLink className="nav-link text-light" to={'/'}><Icon.Lock/> Login</NavLink></li>}
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;