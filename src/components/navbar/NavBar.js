import React, {useContext, useState} from 'react';
import delicioso from '../../assets/delicioso.png';
import styles from './NavBar.module.css';
import {AuthContext} from "../../context/AuthContext";
import Dropdown from "../dropdown/Dropdown";
import {useNavigate} from "react-router-dom";
import {returnRandomSearchQuery} from "../../helpers/functions";

const NavBar = ({setSearchField,}) => {

    const {isAuth, user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles["outer-container"]}>
            <div className={styles["inner-container"]}>
                <nav className={styles['navbar-container']}>
                    <img src={delicioso} alt="logo" className={styles['logo']} onClick={() => {
                        setSearchField(returnRandomSearchQuery());
                        navigate('/')
                    }}/>
                    <h1 className={styles['title']} onClick={() => {
                        setSearchField(returnRandomSearchQuery());
                        navigate('/')
                    }}>Delicioso</h1>
                    {isAuth && (
                        <p className={styles["welcome"]}>welcome {user.username}
                        </p>
                    )}
                        <div className={styles['nav-bar-dropdown']}>
                            <Dropdown setSearchField={setSearchField} isOpen={isOpen} setIsOpen={setIsOpen}/>
                        </div>
                </nav>
            </div>
        </div>
    )
}

export default NavBar;