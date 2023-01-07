import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import './Header.css';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

const Header = ({
                    children,
                    recipes,
                    setRecipes,
                    searchInitiated,
                    toggleSearchInitiated,
                    searchField,
                    setSearchField
                }) => {

    const {isAuth, user, logout} = useContext(AuthContext);
    const [dropdown, toggleDropdown] = useState(false);
    const navigate = useNavigate()

    function dropdownHandler() {
        toggleDropdown(!dropdown);
        console.log(dropdown);
    }

    async function fetchSearchData(search) {

        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee&random=true`);
            console.log(response.data.hits);
            setRecipes(() => response.data.hits);
        } catch (err) {
            console.error(err);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
        search-field: ${searchField} 
        `);

        setSearchField(searchField);
        // setRecipes(() => fetchSearchData(searchField));
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
                                    <li className="nav-username " onClick={() => dropdownHandler()}>welcome<br/>{user} <span
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
                <div>
                    {children}
                </div>
            </div>
        </header>
    );
};

export default Header;