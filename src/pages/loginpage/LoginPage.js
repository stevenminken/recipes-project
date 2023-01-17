import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

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
        <main>
            <div>
                <h2>Don't have an account?<Link to={'/registration'}> Sign Up</Link></h2>
            </div>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="email-field">Email</label>
                    <input
                        name="email"
                        id="email-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </section>
                <section>
                    <label htmlFor="password-field">Password</label>
                    <input
                        name="password"
                        id="password-field"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </section>
                {error && <p className="error">Combinatie van email adres en wachtwoord is onjuist</p>}
                <button type="submit">Submit</button>
                {/*    TODO password vergeten*/}
            </form>
            <p>Heb je nog geen account? <Link to="/registration">Registreer</Link> je dan eerst.</p>
        </main>
    )
};

export default LoginPage;