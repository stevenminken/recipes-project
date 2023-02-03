import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import styles from "../profilepage/ProfilePage.module.css";
import Button from "../../components/button/Button";
import {returnRandomSearchQuery} from "../../helpers/functions";

const ProfilePage = ({setSearchField}) => {
    const {user, updateUserEmail, updateUserPassword, succesResponse, responseError} = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [emailError, toggleEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, togglePasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [repeatPasswordError, toggleRepeatPasswordError] = useState(false);
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');

    useEffect(() => {
        setRole(getUserRole);
    }, [])

    function getUserRole() {
        let userRole = 'user';
        user.roles.map((role) => {
            if (role.name.includes('ADMIN')) {
                userRole = "admin"
            }
        });
        return userRole;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (email.length > 0 && email.length < 6) {
            toggleEmailError(true);
            setEmailErrorMessage('email should be at least 6 characters');
        } else if (!email.includes('@')) {
            toggleEmailError(true);
            setEmailErrorMessage('email address should contain @');
        } else {
            toggleEmailError(false)
            setEmailErrorMessage('');
        }
        if (password.length > 0 && password.length < 6) {
            togglePasswordError(true);
            setPasswordErrorMessage('password should be at least 6 characters');
        } else {
            togglePasswordError(false)
            setPasswordErrorMessage('');
        }
        if (password !== repeatPassword) {
            toggleRepeatPasswordError(true);
            setRepeatPasswordErrorMessage('passwords don\'t match');
        } else {
            toggleRepeatPasswordError(false)
            setRepeatPasswordErrorMessage('');
        }
        if (!emailError && !passwordError && !repeatPasswordError) {
            if (email.length > 0) {
                updateUserEmail(email);
            }
            if (password.length > 0) {
                updateUserPassword(password);
            }
        }
    }


    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles["content-div"]}>
                        <div className={styles['title-div']}>
                            <h2>Profile Page</h2>
                            <h3 className={styles["personal-title"]}>Personal data</h3>
                        </div>
                        <form onSubmit={handleSubmit} className={styles["form"]}>
                            <section className={styles['input-section']}>
                                <label htmlFor="username">Username:</label>
                                <p className={styles['profile-text']}>{user.username}</p>
                            </section>
                            <section className={styles['input-section']}>
                                <label htmlFor="role">Role:</label>
                                <p className={styles['profile-text']}>{role}</p>
                            </section>
                            <section>
                                <label htmlFor="email">Email:</label><input
                                type="text"
                                id="email"
                                placeholder={user.email}
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                                {emailError && (
                                    <p className={styles['error-message-email']}>{emailErrorMessage}</p>)
                                }
                                {succesResponse.succesEmail && (
                                    <p className={styles['succes-message-email']}>{succesResponse.succesMessageEmail}</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="password">New Password:</label><input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="type your new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}>
                            </input>
                                {passwordError && (
                                    <p className={styles['error-message-password']}>{passwordErrorMessage}</p>)
                                }
                                {succesResponse.succesPassword && (
                                    <p className={styles['succes-message-password']}>{succesResponse.succesMessagePassword}</p>
                                )}
                            </section>
                            <section>
                                <label htmlFor="repeatPassword">Repeat Password:</label><input
                                type="password"
                                id="repeatPassword"
                                name="repeatPassword"
                                placeholder="repeat your new password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}>
                            </input>
                                {repeatPasswordError && (
                                    <p className={styles['error-message-password']}>{repeatPasswordErrorMessage}</p>)
                                }
                            </section>
                            <section className={styles['response-section']}>
                            {responseError.error && (
                                <p className={styles['error-message']}>{responseError.errorMessage.data.message}</p>
                            )}
                            </section>
                            <section className={styles['button-section']}>
                                <Button>Save Changes</Button>
                                {responseError.error &&
                                    <section><p className={styles['error-message']}>{responseError.errorMessage}</p>
                                    </section>}
                            </section>
                        </form>
                        <section className={styles['link-text-near-footer']}>
                            <p><Link to="/" onClick={() => setSearchField(returnRandomSearchQuery())}
                                     className={styles['link-style']}>back to the homepage</Link>
                            </p>
                            {(role === 'admin') && (
                                <>
                                    <p><Link to='/admin' className={styles['link-style']}>adminpage</Link></p>
                                </>
                            )}
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;