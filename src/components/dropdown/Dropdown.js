import React, {useEffect, useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import styles from "./Dropdown.module.css";
import {returnRandomSearchQuery} from "../../helpers/functions";

const Dropdown = ({setSearchField, isOpen, setIsOpen}) => {

    const navigate = useNavigate();
    const {isAuth, user, logout} = useContext(AuthContext);

    useEffect(() => {
        document.body.addEventListener("click", (e) => {
            if (!e.target.classList.contains('dropdown-icon')) {
                setIsOpen(false);
            }
        });
    }, [])

    const handleClick = e => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    function handleLogout() {
        const randomString = returnRandomSearchQuery();
        logout();
        setSearchField(randomString);
        navigate('/');
    }

    return (
        <>
            <div className={styles['dropdown']}>
                {!isAuth && (
                    <NavLink to="/login"
                             className={styles["login-text"]}>Login< /NavLink>
                )}
                {isAuth && (
                    <span className='material-symbols-outlined person-icon' onClick={handleClick}>
                    person</span>
                )}
                {isAuth && isOpen && (
                    <ul className={styles['dropdown-menu']}>
                        <li className={styles['drop-down-item']}>
                            <NavLink to="/profile"
                                     onClick={() => navigate("/profile")}>Profile</NavLink>
                        </li>
                        <li className={styles['drop-down-item']}>
                            <NavLink to="/"
                                     onClick={handleLogout}>Logout</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </>)
}

export default Dropdown;
