import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import './Header.css';
import {AuthContext} from "../../context/AuthContext";

const Header = ({
                    recipes,
                    setRecipes,
                    searchInitiated,
                    toggleSearchInitiated,
                    searchField,
                    setSearchField,
                    fetchSearchData
                }) => {

    const {isAuth, user, logout} = useContext(AuthContext);
    const [dropdown, toggleDropdown] = useState(false);
    const navigate = useNavigate()

    function dropdownHandler() {
        toggleDropdown(!dropdown);
        console.log(dropdown);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
        search-field: ${searchField} 
        `);
        setSearchField(searchField);
        void fetchSearchData(searchField);
        toggleSearchInitiated(true);
    }

    return (
        <header className="outer-container">
            <div className="inner-container">
                <div className="header">
                    <img src={logo} alt="Recipes.com logo" className="logo" onClick={() => {
                        void fetchSearchData("potatoes");
                        setSearchField('');
                        document.getElementById("search-field").value = '';
                        navigate('/')
                    }}/>
                    <form onSubmit={handleSubmit} className=" search-bar">
                        <input
                            type="text"
                            name="search-field"
                            placeholder="search recipe"
                            id="search-field"
                            className="search-field"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            onMouseDown={(e) => toggleSearchInitiated(false)}
                        />
                        <button type="submit" id="search-button" className="search-button">Search</button>
                        <span className="material-symbols-outlined">search</span>
                    </form>

                    {/*TODO NAVIGATION component*/}
                    <nav>
                        <ul>
                            {/*TODO styling*/}
                            {!isAuth && (
                                <li><NavLink to="/login"
                                             className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Login</NavLink>
                                </li>
                            )}
                            {/*TODO actieve link corrigeren*/}
                            {isAuth && (
                                <ul className="drop-down-container">
                                    <li className="nav-username " onClick={() => dropdownHandler()}>welcome<br/>{user}
                                        <span
                                            className="material-symbols-outlined">person</span>
                                    </li>
                                    {dropdown && (
                                        <>
                                            <li className="drop-down-item"><NavLink to="/profile"
                                                                                    className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                                                                    onClick={() => navigate("/profile")}>Profile</NavLink>
                                            </li>
                                            <li className="drop-down-item"><NavLink to="/"
                                                                                    className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                                                                    onClick={logout}>Logout</NavLink>
                                            </li>
                                        </>
                                    )}

                                </ul>
                            )}

                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;