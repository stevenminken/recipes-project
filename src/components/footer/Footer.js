import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (

        <section className="outer-container">
            <div className="inner-container  footer-container">
                <p>	&#169;Steven Minken</p>
                <p>Algemene voorwaarden</p>
                <p><Link to='/contact' className="footer-contact-link">contact</Link></p>
                <p>Route</p>
            </div>
        </section>
    );
};

export default Footer;