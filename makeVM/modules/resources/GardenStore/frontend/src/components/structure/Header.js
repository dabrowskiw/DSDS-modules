import { React } from 'react';
import { NavLink } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import '../styles.css';

const Header = (props) => {

    const logout = () =>{
        props.onLogout();
    }
  
    return (
        <header>
            <div className="menu-container">
                <h2><NavLink className="nav-link text-light header-title" to={'/landingPage'}>Gardeningstore</NavLink></h2>
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