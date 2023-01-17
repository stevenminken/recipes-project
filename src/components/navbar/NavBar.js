import React, {useContext, useState} from 'react';
import logo from '../../assets/logo.png';
import styles from './NavBar.module.css';
import {AuthContext} from "../../context/AuthContext";
import Dropdown from "../dropdown/Dropdown";
import {useNavigate} from "react-router-dom";

const NavBar = ({
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
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles['navbar']}>
            <div className={styles['navbar-container']}>
                <img src={logo} alt="Recipes.com logo" className={styles['logo']} onClick={() => {
                    // document.getElementById("search-field").value = '';
                    setSearchFieldTemp('');
                    void toggleInitialRenderHome(true);
                    navigate('/')
                }}/>
                {/*TODO NAVIGATION component*/}

                {/*    <div className={isOpen ? styles['nav-username-open']: styles['nav-username-closed']}*/}
                {isAuth && (
                    <p>welcome<br/>{user.username}
                    </p>
                )}
                <div>
                    <nav className={styles['nav-bar']}>
                        <Dropdown setSearchField={setSearchField} isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </nav>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;