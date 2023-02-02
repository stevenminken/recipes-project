import React, {useState} from 'react';
import axios from "axios";
import Header from "../../components/header/Header";
import styles from './ContactPage.module.css'
import {Link} from "react-router-dom";
import Button from "../../components/button/Button";

const ContactPage = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [remark, setRemark] = useState('');
    const [formactive, toggleFormactive] = useState(true);


    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
    Firstname: ${firstname}, 
    Lastname: ${lastname}, 
    Email: ${email}, 
    Remark: ${remark}, 
    `);
    }

    function handleToggle() {
        if (!formactive) {
            toggleFormactive(true);
        }
    }

    return (
        <div className="outer-container" onClick={handleToggle}>
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles['text-div']}>
                        <h2>Please send us a comment!</h2>
                    </div>
                    <form onSubmit={handleSubmit} className={styles['form']}>
                        <div className={styles['input-div']}>
                            <label htmlFor="firstname-field">First Name</label>
                            <input
                                name="firstname"
                                id="firstname-field"
                                type="text"
                                placeholder="First Name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                onClick={() => toggleFormactive(false)}
                            />
                        </div>
                        <div className={styles['input-div']}>
                            <label htmlFor="lastname-field">Last Name</label>
                            <input
                                name="lastname"
                                id="lastname-field"
                                type="text"
                                placeholder="Last Name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                onClick={() => toggleFormactive(false)}
                            />
                        </div>
                        <div className={styles['input-div']}>
                            <label htmlFor="email-field">Email</label>
                            <input
                                name="email"
                                id="email-field"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onClick={() => toggleFormactive(false)}
                            />
                        </div>
                        <div className={styles['input-div']}>
                            <label htmlFor="remark-field" className={styles["remark-label"]}>Remark</label>
                            <textarea
                                name="remark"
                                id="remark-field"
                                value={remark}
                                placeholder="Remark"
                                onChange={(e) => setRemark(e.target.value)}
                                rows={6}
                                cols={40}
                                onClick={() => toggleFormactive(false)}
                            />
                        </div>
                        {!formactive && (
                            <div className={styles["warning"]}>
                                This form is unfortunately not active yet
                            </div>
                        )
                        }
                        <Button>Send</Button>
                    </form>
                </main>
            </div>
        </div>
    )
}
export default ContactPage;