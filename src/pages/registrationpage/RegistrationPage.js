import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [newsletter, toggleNewsletter] = useState(false);
    const [agreeTerms, toggleAgreeTerms] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`http://localhost:3000/register`, {
                email: email,
                password: password,
                username: username,
            });
            navigate('/login');
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email-field">
                    Email:
                    <input
                        name="email"
                        id="email-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="username-field">
                    Gebruikersnaam:
                    <input
                        type="text"
                        id="username-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password-field">
                    Password:
                    <input
                        name="password"
                        id="password-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {/*<label htmlFor="newsletter-field">Newsletter</label>*/}
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    name="agree"*/}
                {/*    id="agree-field"*/}
                {/*    value={newsletter}*/}
                {/*    onChange={(e) => toggleNewsletter(e.target.checked)}*/}
                {/*/>*/}
                {/*<label htmlFor="agree-field">I accept the terms and conditions</label>*/}
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    name="agree"*/}
                {/*    id="agree-field"*/}
                {/*    value={agreeTerms}*/}
                {/*    onChange={(e) => toggleAgreeTerms(e.target.checked)}*/}
                {/*/>*/}
                <button type="submit">
                    Submit
                </button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/login">hier</Link> inloggen.</p>
        </main>
    );
};

export default RegistrationPage;