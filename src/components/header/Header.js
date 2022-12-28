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
                    {/*TODO NAVIGATION component*/}
                    <nav>
                        <ul>
                            {/*TODO styling*/}
                            <li><NavLink to="/" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Home</NavLink></li>
                            <li><NavLink to="/recipe" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Recipe</NavLink></li>
                            <li><NavLink to="/login" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Login</NavLink></li>
                            <li><NavLink to="/registration" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Register</NavLink></li>
                            <li><NavLink to="/profile" className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Profile</NavLink></li>
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