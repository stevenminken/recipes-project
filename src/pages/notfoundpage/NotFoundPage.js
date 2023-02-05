import React from 'react';
import styles from './NotFoundPage.module.css';
import {useNavigate} from "react-router-dom";
import Button from "../../components/button/Button";
import {returnRandomSearchQuery} from "../../helpers/functions";

const NotFound = ({setSearchField}) => {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/");
        setSearchField(() => returnRandomSearchQuery());
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <main className={styles['main-container']}>
                    <div className={styles['content-container']}>
                        <h2>This page can't be found</h2>
                        <h3>Return to the main menu</h3>
                        <Button
                                onClick={handleClick}>
                            Home
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotFound;