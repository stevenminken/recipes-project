import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import styles from "../profilepage/ProfilePage.module.css";
import Button from "../../components/button/Button";

const ProfilePage = ({setSearchField}) => {
    const [profileData, setProfileData] = useState({});
    const [change, toggleChange] = useState({});
    const {user} = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');


    useEffect(() => {

        async function fetchProfileData() {
            const token = localStorage.getItem('token');

            try {
                const result = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProfileData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchProfileData();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);
        toggleLoading(true);

        try {
            await axios.post(`http://localhost:3000/register`, {
                email: email,
                password: user.password,
                username: username,
            });
        } catch (e) {
            console.error(e);
            toggleError(true);
        }

        toggleLoading(false);
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles["content-div"]}>
                        <div className={styles['title-div']}>
                            <h2>Profile Page</h2>
                        </div>
                        <h3 className={styles["personal-title"]}>Personal data</h3>
                        <form onSubmit={handleSubmit} className={styles["form"]}>
                            <section className={styles['input-section']}>
                                <label for="username">Username:</label><input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={user.username}>
                            </input>
                            </section>
                            <section>
                                <label for="email">Email:</label><input
                                type="text"
                                id="email"
                                name="email"
                                placeholder={user.email}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}>
                            </input>
                                {/*<p><strong>Newsletter:</strong>{user.newsletter}</p>*/}
                            </section>
                            <Button>Change</Button>
                            {/*    TODO waardes aanpassen*/}
                        </form>
                        <p className={styles["back-text"]}>Back to the <Link to="/"
                                                                             onClick={() => setSearchField('curry')}>homepage</Link>
                        </p>
                    </div>
                </main>
            </div>
        </div>
    )
        ;
};

export default ProfilePage;