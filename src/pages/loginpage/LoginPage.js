import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import styles from './LoginPage.module.css';
import Button from "../../components/button/Button";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, toggleError] = useState(false);
    const {login, user} = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const result = await axios.post(`http://localhost:3000/login`, {
                email: email,
                password: password,
            });

            login(result.data.accessToken);

        } catch (e) {
            console.error(e);
            toggleError(true);
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
                            <label htmlFor="email-field">Email:</label>
                            <input
                                name="email"
                                id="email-field"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </section>
                        <section>
                            <label htmlFor="password-field">Password:</label>
                            <input
                                name="password"
                                id="password-field"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </section>
                        {error &&
                            <section><p className="error">Combination of email and password is not correct</p>
                            </section>}
                        <section className={styles['button-section']}>
                            <Button>Submit</Button>
                        </section>
                        {/*    TODO password vergeten*/}
                    </form>
                </main>
            </div>
        </div>
    )
};

export default LoginPage;