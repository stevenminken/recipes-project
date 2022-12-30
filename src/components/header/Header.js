import React, {useContext} from 'react';
import logo from '../../assets/logo.png';
import {NavLink} from "react-router-dom";
import './Header.css';
import {AuthContext} from "../../context/AuthContext";

const Header = ({children}) => {

    const {isAuth, user, logout} = useContext(AuthContext);

    return (
        <header className="outer-container">
            <div className="inner-container">
                <div className="header">
                    <img src={logo} alt="Recipes.com logo" className="logo"/>
                    {isAuth && (
                        <p className="nav-username">{user}</p>
                    )}
                    {/*TODO NAVIGATION component*/}
                    <nav>
                        <ul>
                            {/*TODO styling*/}
                            <li><NavLink to="/"
                                         className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Home</NavLink>
                            </li>
                            <li><NavLink to="/recipe"
                                         className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Recipe</NavLink>
                            </li>
                            {!isAuth && (
                                <li><NavLink to="/login"
                                             className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Login</NavLink>
                                </li>
                            )}
                            {/*TODO actieve link corrigeren*/}
                            {isAuth && (
                                <li><NavLink to="/"
                                             className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                             onClick={logout}>Logout</NavLink></li>
                            )}
                            <li><NavLink to="/registration"
                                         className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Register</NavLink>
                            </li>
                            <li><NavLink to="/profile"
                                         className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Profile</NavLink>
                            </li>
                            <li><NavLink to="/contact"
                                         className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Contact</NavLink>
                            </li>
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