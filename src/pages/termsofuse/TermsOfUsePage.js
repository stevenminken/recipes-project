import React from 'react';
import styles from "../privacypolicy/PrivacyPolicyPage.module.css";
import {Link} from "react-router-dom";

const TermsOfUsePage = () => {
    return (
        <div className="outer-container">
            <div className="inner-container">
                <div className={styles["content-div"]}>
                    <h2>Terms of Use</h2>
                    <p>Welcome to Delicioso, a website that provides access to a variety of recipes and cooking-related
                        information. By accessing or using our website, you agree to be bound by the following terms of
                        use. If
                        you do not agree to these terms, please do not use our website.</p>
                    <h3>Content</h3>

                    <p>All of the content on our website, including but not limited to, recipes, images, videos, and
                        text, is
                        the property of [website name] or its licensors and is protected by copyright and other
                        intellectual
                        property laws. You may use the content on our website for personal, non-commercial use only. You
                        may not
                        copy, reproduce, distribute, publish, display, perform, modify, create derivative works,
                        transmit, or in
                        any way exploit any part of the content on our website without the express written consent of
                        [website
                        name].
                    </p>
                    <h3>Submissions</h3>

                    <p>If you submit any content to our website, such as comments, recipes, or images, you grant
                        [website name]
                        a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use,
                        reproduce,
                        modify, adapt, publish, translate, create derivative works from, distribute, and display such
                        content
                        throughout the world in any media. You represent and warrant that you own or control all of the
                        rights
                        to the content you submit and that the use of such content will not infringe any third party
                        rights.
                    </p>
                    <h3>User Conduct</h3>

                    <h3>By using our website, you agree not to:</h3>

                    <p>Use our website for any illegal or unauthorized purpose
                        Engage in any conduct that is harmful, threatening, abusive, or that violates the rights of
                        others
                        Use our website to transmit any viruses, worms, or other harmful or destructive code
                        Attempt to gain unauthorized access to our website or other users' accounts</p>
                    <h3>Disclaimers</h3>

                    <p>Our website and its content are provided "as is" without warranty of any kind, either express or
                        implied,
                        including, but not limited to, the implied warranties of merchantability and fitness for a
                        particular
                        purpose, or non-infringement. [website name] and its licensors do not warrant that the content
                        on our
                        website is accurate, complete, or current. [website name] does not control or endorse any
                        content
                        submitted by third parties and will not be responsible for any content, including but not
                        limited to,
                        any errors or omissions in any content, or any loss or damage of any kind incurred as a result
                        of the
                        use of any content.
                    </p>
                    <h3>Indemnification</h3>

                    <p>You agree to indemnify, defend, and hold harmless [website name] and its licensors, and their
                        respective
                        officers, directors, employees, agents, and assigns from and against any and all claims,
                        damages,
                        liabilities, costs, and expenses, including reasonable attorneys' fees, arising out of or
                        related to
                        your use of our website, your submission of content to our website, or your violation of these
                        terms of
                        use.
                    </p>
                    <h3>Changes to the Terms of Use</h3>

                    <p>We reserve the right to change these terms of use at any time. If we make changes, we will post
                        the new
                        terms of use on our website. Your continued use of our website after the changes are posted
                        constitutes
                        your acceptance of the changes.
                    </p>
                    <h3>Contact Us</h3>

                    <p>If you have any questions or concerns about our privacy policy, please contact us from the <Link
                        to={"/contact"}>contactpage.</Link></p>

                </div>
            </div>
        </div>
    );
};

export default TermsOfUsePage;