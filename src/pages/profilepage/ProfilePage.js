import React from 'react';
import Header from "../../components/header/Header";
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    return (
        <main>
            <section>
                <label htmlFor="email-field">Email</label>
                <p id="email-field"
                    // value={email}
                >het email adres</p>
            </section>
            <section>
                <label htmlFor="password-field">Password</label>
                <p
                    id="password-field"
                    // value={password}
                >Het password field</p>
            </section>
            <section>
                <label htmlFor="newsletter-field">Newsletter</label>
                <p
                    id="newsletter-field"
                    // value={password}
                >true or false</p>
            </section>
            <button type="change">Change</button>
            {/*    TODO waardes aanpassen*/}
        </main>
    );
};

export default ProfilePage;