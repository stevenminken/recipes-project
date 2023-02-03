import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import styles from "../adminpage/AdminPage.module.css";
import {v4 as uuidv4} from 'uuid';

const AdminPage = ({setSearchField}) => {
    const {requestAllUserData} = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        requestAllUserData().then(data => {
            setUsers(data);
            setLoading(false);
        }).catch(error => {
            // console.error(error);
            setLoading(false);
        });
    }, [])

    function getUserRole(user) {
        let userRole = 'user';
        user.roles.map((role) => {
            if (role.name.includes('ADMIN')) {
                userRole = "admin"
            }
            return null;
        });
        return userRole;
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-element']}>
                    <div className={styles["content-div"]}>
                        <div className={styles['title-bar']}>
                            <div className={styles['title-div']}>
                                <h2>Adminpage</h2>
                            </div>
                            <div className={styles['admin-titlebar']}>
                                <h3 className={styles["data-title"]}>All users: </h3>
                            </div>
                        </div>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                {users.map((user) => {
                                    return (
                                        <article className={styles['article-div']} key={uuidv4()}>
                                            <p>{user.username}</p>
                                            <p>{user.email}</p>
                                            <p>{getUserRole(user)}</p>
                                        </article>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
export default AdminPage;