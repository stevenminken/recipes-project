import React, {useState} from 'react';
import Header from "../../components/header/Header";
import {Link} from "react-router-dom";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
    Email: ${email}, 
    Password: ${password}, 
    `);
        console.log(`email: ${email}, password: ${password}`);
    }

    return (
        <>
            <Header>
                <h1>Recipes.com loginpage</h1>
            </Header>
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
                <button type="submit">Submit</button>
            {/*    TODO password vergeten*/}
            </form>
        </>
    );
};

export default LoginPage;