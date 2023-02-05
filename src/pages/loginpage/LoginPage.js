import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import styles from './LoginPage.module.css';
import Button from "../../components/button/Button";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login, responseError} = useContext(AuthContext);

    const [usernameError, toggleUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordError, togglePasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (username.length < 6) {
            toggleUsernameError(true);
            setUsernameErrorMessage('username should be at least 6 characters');
        } else {
            toggleUsernameError(false)
            setUsernameErrorMessage('');
        }
        if (password.length < 6) {
            togglePasswordError(true);
            setPasswordErrorMessage('password should be at least 6 characters');
        } else {
            togglePasswordError(false)
            setPasswordErrorMessage('');
        }
        if (!usernameError && !passwordError) {
            login(username, password);
        }
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles['text-div']}>
                        <h2>Don't have an account?<Link to={'/registration'}> Sign Up</Link></h2>
                    </div>
                    <form onSubmit={handleSubmit} className={styles['form']}>
                        <section>
                            <label htmlFor="username-field">Username:</label>
                            <input
                                name="username"
                                id="username-field"
                                type="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {usernameError && (
                                <p className={styles['error-message']}>{usernameErrorMessage}</p>)
                            }
                        </section>
                        <section>
                            <label htmlFor="password-field">Password:</label>
                            <input
                                name="password"
                                id="password-field"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && (
                                <p className={styles['error-message']}>{passwordErrorMessage}</p>)
                            }
                        </section>
                        <section className={styles['button-section']}>
                            <Button>Submit</Button>
                            {responseError.error &&
                                <h4 className={styles['error-message']}>Verify your login credentials and try again</h4>
                                }
                        </section>
                        {/*    TODO password vergeten*/}
                    </form>
                </main>
            </div>
        </div>
    )
};

export default LoginPage;