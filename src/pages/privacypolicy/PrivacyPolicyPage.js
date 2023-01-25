import React from 'react';
import {Link} from "react-router-dom";
import styles from "./PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className={styles["content-div"]}>
                    <h2>Privacy Policy</h2>

                    <p>At Delicioso, we are committed to protecting your privacy. We use the information we collect
                        about you to
                        provide and enhance the services we offer on our website.</p>

                    <h3>Information we collect</h3>

                    <p>We collect information about you when you register on our website, place an order, subscribe to
                        our
                        newsletter, or participate in a survey or promotion. The types of information we collect include
                        your
                        name, email address, postal address, and telephone number. We also collect information about
                        your use of
                        our website, including the pages you visit and the products you view.</p>
                    <h3>Use of your information</h3>

                    <p>We use the information we collect about you to provide and enhance the services we offer on our
                        website.
                        This may include using your information to process and fulfill your orders, to send you
                        promotional
                        materials, and to contact you with information about our products and services. We may also use
                        your
                        information to analyze website usage and to improve the content and design of our website.</p>
                    <h3>Sharing your information</h3>

                    <p>We do not sell or rent your personal information to third parties. We may share your information
                        with
                        third parties for the purpose of providing the services we offer on our website, such as
                        processing and
                        fulfilling your orders. We may also share your information with third parties for marketing and
                        promotional purposes, with your consent.</p>
                    <h3>Security</h3>

                    <p>We take reasonable precautions to protect your personal information from loss, misuse, and
                        unauthorized
                        access, disclosure, alteration, and destruction.</p>

                    <h3>Changes to this policy</h3>

                    <p>We may update this privacy policy from time to time. We will notify you of any changes by posting
                        the new
                        policy on our website.</p>

                    <h3>Contact us</h3>

                    <p>If you have any questions or concerns about our privacy policy, please contact us from the <Link
                        to={"/contact"}>contactpage.</Link></p>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;