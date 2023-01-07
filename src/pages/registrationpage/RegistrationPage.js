import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './RegistrationPage.css';

const RegistrationPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newsletter, toggleNewsletter] = useState(false);
    const [agreeTerms, toggleAgreeTerms] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
    Email: ${email}, 
    Password: ${password}, 
        Newsletter: ${newsletter},
    TermsAndConditions: ${agreeTerms}
    `);
        console.log(`email: ${email}, password: ${password}, Newsletter: ${newsletter}, TermsAndConditions: ${agreeTerms}`);
    }

    return (
        <>
            <section className="outer-container">
                <div className="inner-container">
                    <div>
                        <h2>Already have an account? Click: <Link to={'/login'}>here</Link></h2>
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
                        <section>
                            <label htmlFor="newsletter-field">Newsletter</label>
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree-field"
                                value={newsletter}
                                onChange={(e) => toggleNewsletter(e.target.checked)}
                            />
                        </section>
                        <section>
                            <label htmlFor="agree-field">I accept the terms and conditions</label>
                            <input
                                type="checkbox"
                                name="agree"
                                id="agree-field"
                                value={agreeTerms}
                                onChange={(e) => toggleAgreeTerms(e.target.checked)}
                            />
                        </section>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default RegistrationPage;