import React from 'react';
import styles from './NotFoundPage.module.css';
import Header from "../../components/header/Header";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className={styles['main-container']}>
            <div className={styles['content-container']}>
                <h2>This page can't be found</h2>
                <h3>Return to the main menu</h3>
                <button className={styles['button']} type="button"
                        onClick={() => navigate("/")}>
                    Home
                </button >
            </div>
        </main>
    );
};

export default NotFound;