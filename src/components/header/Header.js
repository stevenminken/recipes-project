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
                    fetchSearchData,
                    initialRenderHome,
                    toggleInitialRenderHome,
                    searchFieldTemp,
                    setSearchFieldTemp
                }) => {

    const {isAuth, user, logout} = useContext(AuthContext);
    const [dropdown, toggleDropdown] = useState(false);
    const navigate = useNavigate()
    let dropdownOpen = false;

    function dropdownHandler() {
        toggleDropdown(!dropdown);
        dropdownOpen = !dropdownOpen;
        console.log(dropdown);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
        search-field: ${searchFieldTemp} 
        `);
        setSearchField(searchFieldTemp);
        toggleSearchInitiated(true);
    }

    return (
        <header className="outer-container">
            <div className="inner-container">
                <div className="header">
                    <img src={logo} alt="Recipes.com logo" className="logo" onClick={() => {
                        // document.getElementById("search-field").value = '';
                        setSearchFieldTemp('');
                        void toggleInitialRenderHome(true);


                        navigate('/')
                    }}/>
                    <form onSubmit={handleSubmit} className=" search-bar">
                        <input
                            type="text"
                            name="search-field"
                            placeholder="search recipe"
                            id="search-field"
                            className="search-field"
                            value={searchFieldTemp}
                            onChange={(e) => setSearchFieldTemp(e.target.value)}
                            onMouseDown={(e) => toggleSearchInitiated(false)}
                        />
                        <button type="submit" id="search-button" className="search-button"><span className="material-symbols-outlined">search</span>Search</button>

                    </form>

                    {/*TODO NAVIGATION component*/}
                    <nav className="nav-bar">
                        <ul>
                            {/*TODO styling*/}
                            {!isAuth && (
                                <li><NavLink to="/login"
                                             className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}>Login</NavLink>
                                </li>
                            )}
                            {/*TODO actieve link corrigeren*/}
                            {isAuth && (
                                <div className={dropdownOpen ? "drop-down-nav-open" : "drop-down-nav"}>
                                    <ul className="drop-down-container">
                                        <li className="nav-username "
                                            >welcome<br/>{user}
                                        </li>
                                        {dropdown && (
                                            <div className="drop-down-items">
                                                <li className="drop-down-item"><NavLink to="/profile"
                                                                                        className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                                                                        onClick={() => navigate("/profile")}>Profile</NavLink>
                                                </li>
                                                <li className="drop-down-item"><NavLink to="/"
                                                                                        className={({isActive}) => isActive === true ? 'active-link' : 'default-link'}
                                                                                        onClick={logout}>Logout</NavLink>
                                                </li>
                                            </div>)}
                                    </ul>
                                    <span
                                        className="material-symbols-outlined person-icon" onClick={() => dropdownHandler()}>person
                                </span>
                                </div>
                            )}
                        </ul>
                    </nav>
                    <div/>
                </div>
            </div>
        </header>)}


    export default Header;