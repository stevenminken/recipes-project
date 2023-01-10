import React, {useState, useEffect, useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import styles from "./Dropdown.module.css";

const Dropdown = ({setSearchField, isOpen, setIsOpen}) => {

    const navigate = useNavigate();
    const {isAuth, user, logout} = useContext(AuthContext);

    useEffect(() => {
        document.body.addEventListener('click', handleClick);

        return () => {
            document.body.removeEventListener('click', handleClick);
        };
    }, []);

    const handleClick = e => {
        if (e.target.matches('.person-icon')) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(false);
        }
    };

    function handleLogout() {
        logout();
        setSearchField("italian");
        navigate('/');
    }

    return (
        <>
            <div className={styles['dropdown']}>
                {!isAuth && (
                    <NavLink to="/login"
                             className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}> Login < /NavLink>
                )}
                {isAuth && (
                    <span className='material-symbols-outlined person-icon' onClick={() => setIsOpen(!isOpen)}>
                    person</span>
                )}
                {isAuth && isOpen && (
                    <ul className={styles['dropdown-menu']}>
                        <li className={styles['drop-down-item']}>
                            <NavLink to="/profile"
                                     className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}
                                     onClick={() => navigate("/profile")}>Profile</NavLink>
                        </li>
                        <li className={styles['drop-down-item']}>
                            <NavLink to="/"
                                     className={({isActive}) => isActive === true ? styles['active-link'] : styles['default-link']}
                                     onClick={handleLogout}>Logout</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>)
}

export default Dropdown;
