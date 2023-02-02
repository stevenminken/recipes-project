import React, {useContext, useState} from 'react';
import delicioso from '../../assets/delicioso.png';
import styles from './NavBar.module.css';
import {AuthContext} from "../../context/AuthContext";
import Dropdown from "../dropdown/Dropdown";
import {useNavigate} from "react-router-dom";

const NavBar = ({
                    setSearchField,
                    toggleInitialRenderHome,
                    setSearchFieldTemp
                }) => {

    const {isAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles["outer-container"]}>
            <div className={styles["inner-container"]}>
                <div className={styles['navbar-container']}>
                    <img src={delicioso} className={styles['logo']} onClick={() => {
                        setSearchFieldTemp('');
                        void toggleInitialRenderHome(true);
                        navigate('/')
                    }}/>
                    <h1 className={styles['title']} onClick={() => {
                        setSearchFieldTemp('');
                        void toggleInitialRenderHome(true);
                        navigate('/')
                    }}>Delicioso</h1>
                    {isAuth && (
                        <p className={styles["welcome"]}>welcome {user.username}
                        </p>
                    )}
                    <div>
                        <nav className={styles['nav-bar-dropdown']}>
                            <Dropdown setSearchField={setSearchField} isOpen={isOpen} setIsOpen={setIsOpen}/>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar;