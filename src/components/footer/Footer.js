import React from 'react';
import styles from './Footer.module.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <p>&#169;Steven Minken</p>
            <p>Algemene voorwaarden</p>
            <p><Link to='/contact' className={styles['footer-contact-link']}>contact</Link></p>
            <p>Route</p>
        </footer>
    );
};

export default Footer;