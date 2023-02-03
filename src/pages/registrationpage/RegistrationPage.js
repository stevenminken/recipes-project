import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import styles from './RegistrationPage.module.css';
import Button from "../../components/button/Button";
import {AuthContext} from "../../context/AuthContext";

const RegistrationPage = () => {

    const {register, succesResponse, responseError} = useContext(AuthContext);

    const [usernameError, toggleUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailError, toggleEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, togglePasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [repeatPasswordError, toggleRepeatPasswordError] = useState(false);
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [role, setRole] = useState('user');

    function resetAllErrors() {
        toggleUsernameError(false);
        setUsernameErrorMessage('');
        toggleEmailError(false);
        setEmailErrorMessage('');
        togglePasswordError(false);
        setPasswordErrorMessage('');
        toggleRepeatPasswordError(false);
        setRepeatPasswordErrorMessage('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        resetAllErrors();
        if (username.length < 6) {
            toggleUsernameError(true);
            setUsernameErrorMessage('username should be at least 6 characters');
        } else if (username.includes('0') || username.includes('1') || username.includes('2') || username.includes('3') || username.includes('4') || username.includes('5') || username.includes('6') || username.includes('7') || username.includes('8') || username.includes('9')) {
            toggleUsernameError(true);
            setUsernameErrorMessage('username can\'t contain numbers');
        } else {
            toggleUsernameError(false)
            setUsernameErrorMessage('');
        }
        if (email.length < 6) {
            toggleEmailError(true);
            setEmailErrorMessage('email should be at least 6 characters');
        } else if (!email.includes('@')) {
            toggleEmailError(true);
            setEmailErrorMessage('email address should contain @');
        } else {
            toggleEmailError(false)
            setEmailErrorMessage('');
        }
        if (password.length < 6) {
            togglePasswordError(true);
            setPasswordErrorMessage('password should be at least 6 characters');
        }
        if (password !== repeatPassword) {
            toggleRepeatPasswordError(true);
            setRepeatPasswordErrorMessage('passwords don\'t match');
        } else {
            toggleRepeatPasswordError(false)
            setRepeatPasswordErrorMessage('');
        }
        if (!usernameError && !emailError && !passwordError && !repeatPasswordError) {
            register(username, email, password, role);
        }
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles['text-div']}>
                        <h2>Already have an account?<Link to={'/login'}>Login</Link></h2>
                    </div>
                    <form onSubmit={handleSubmit} className={styles['form']}>
                        <section>
                            <label htmlFor="username-field">
                                Username:</label>
                            <input
                                type="text"
                                id="username-field"
                                value={username}
                                placeholder="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && (
                                <p className={styles['error-message-input']}>{usernameErrorMessage}</p>)
                            }
                        </section>
                        <section>
                            <label htmlFor="email-field">
                                Email:</label>
                            <input
                                name="email"
                                id="email-field"
                                type="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && (
                                <p className={styles['error-message-input']}>{emailErrorMessage}</p>)
                            }
                        </section>
                        <section>
                            <label htmlFor="password-field">
                                Password:</label>
                            <input
                                name="password"
                                id="password-field"
                                type="password"
                                placeholder="new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && (
                                <p className={styles['error-message-input']}>{passwordErrorMessage}</p>)
                            }
                        </section>
                        <section>
                            <label htmlFor="repeatPassword">Repeat Password:</label><input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            placeholder="repeat new password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}>
                        </input>
                            {repeatPasswordError && (
                                <p className={styles['error-message-input']}>{repeatPasswordErrorMessage}</p>)
                            }
                        </section>
                        <section>
                            <label>
                                Role:</label>
                            <section>
                                <label htmlFor="user" className={styles['radio-label']}>
                                    User
                                    <input
                                        type="radio"
                                        name="role"
                                        id="user"
                                        defaultChecked
                                        onClick={(e) => setRole('user')}
                                    /></label>
                                <label htmlFor="admin" className={styles['radio-label']}>
                                    Admin
                                    <input
                                        type="radio"
                                        name="role"
                                        id="admin"
                                        onClick={(e) => setRole('admin')}
                                    /></label>
                            </section>
                        </section>
                        {succesResponse.succes && (
                            <p className={styles['succes-message']}>{succesResponse.succesMessage}</p>
                        )}
                        {responseError.error && (
                            <p className={styles['error-message']}>{responseError.errorMessage.data.message}</p>
                        )}
                        <section className={styles['button-section']}>
                            <Button>
                                Submit
                            </Button>
                        </section>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default RegistrationPage;