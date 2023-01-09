import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import styles from './Header.module.css';
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
        navigate('/');
        toggleSearchInitiated(true);
    }

    return (
        <header className={styles['header']}>
            <div className={styles['header-container']}>
                <img src={logo} alt="Recipes.com logo" className={styles['logo']} onClick={() => {
                    // document.getElementById("search-field").value = '';
                    setSearchFieldTemp('');
                    void toggleInitialRenderHome(true);


                    navigate('/')
                }}/>
                <form onSubmit={handleSubmit} className={styles['search-bar']}>
                    <input
                        type="text"
                        name="search-field"
                        placeholder="search recipe"
                        id="search-field"
                        className={styles['search-field']}
                        value={searchFieldTemp}
                        onChange={(e) => setSearchFieldTemp(e.target.value)}
                        onMouseDown={(e) => toggleSearchInitiated(false)}
                    />
                    <button type="submit" id="search-button" className={styles['search-button']}><span
                        className={styles['material-symbols-outlined']}>Search</span>
                    </button>

                </form>

                {/*TODO NAVIGATION component*/}
                <nav className={styles['nav-bar']}>
                    <ul>
                        {/*TODO styling*/}
                        {!isAuth && (
                            <li><NavLink to="/login"
                                         className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}> Login < /NavLink>
                            </li>
                        )}
                        {/*TODO actieve link corrigeren*/}
                        {isAuth && (
                            <li
                                className={dropdownOpen ? styles['drop-down-nav-open'] : styles['drop-down-nav']}>
                                <ul className={styles['drop-down-container']}>
                                    <li className={styles['nav-username']}
                                    >welcome<br/>{user}
                                    </li>
                                    {dropdown && (
                                        <div className={styles['drop-down-items']}>
                                            <li className={styles['drop-down-item']}><NavLink to="/profile"
                                                                                              className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}
                                                                                              onClick={() => navigate("/profile")}>Profile</NavLink>
                                            </li>
                                            <li className="drop-down-item"><NavLink to="/"
                                                                                    className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}
                                                                                    onClick={logout}>Logout</NavLink>
                                            </li>
                                        </div>)}
                                </ul>
                                <span
                                    className='material-symbols-outlined person-icon'
                                    onClick={() => dropdownHandler()}>person</span>
                            </li>)}
                    </ul>
                </nav>
            </div>
        </header>)
}

export default Header;