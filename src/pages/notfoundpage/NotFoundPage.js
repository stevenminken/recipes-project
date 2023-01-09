import React from 'react';
import styles from  './NotFoundPage.module.css';
import Header from "../../components/header/Header";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main>
            <section className={styles['outer-container']}>
                <div className={styles['inner-container']}>
                    <div className="content">
                        <h2>This page can't be found</h2>
                        <h3>Return to the main menu</h3>
                        <button type="button"
                                onClick={() => navigate("/")}>
                            Home
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default NotFound;