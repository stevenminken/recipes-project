import React, {useContext, useEffect, useState} from 'react';
import logo from '../../assets/logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import styles from './Header.module.css';
import {AuthContext} from "../../context/AuthContext";
import Dropdown from "../dropdown/Dropdown";

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
    const [isOpen, setIsOpen] = useState(false);

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
                {isAuth && (
                    <div className={isOpen ? styles['nav-username-open']: styles['nav-username-closed']}
                    >welcome<br/>{user}
                    </div>)}
                <nav className={styles['nav-bar']}>
                    <Dropdown setSearchField={setSearchField} isOpen={isOpen} setIsOpen={setIsOpen}/>
                </nav>
            </div>
        </header>)
}

export default Header;