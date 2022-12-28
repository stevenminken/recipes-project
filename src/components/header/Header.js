import React from 'react';
import logo from '../../assets/logo.png';
import {NavLink} from "react-router-dom";
import './Header.css';

const Header = ({children}) => {
    return (
        <header className="outer-container">
            <div className="inner-container">
                <div className="header">
                    <img src={logo} alt="Recipes.com logo" width="40px"/>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/recipe">Recipe</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/registration">Register</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </header>
    );
};

export default Header;