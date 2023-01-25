import React from 'react';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles["outer-container"]}>
            <div className={styles["inner-container"]}>
                <footer className={styles['inner-footer']}>
                    <p>&#169;2023 Steven Minken</p>
                    <p><Link to='/privacypolicy' className={styles['footer-contact-link']}>Privacy policy</Link></p>
                    <p><Link to='/termsofuse' className={styles['footer-contact-link']}>Terms of use</Link></p>
                    <p><Link to='/contact' className={styles['footer-contact-link']}>Contact</Link></p>
                </footer>
            </div>
        </div>
    );
};

export default Footer;