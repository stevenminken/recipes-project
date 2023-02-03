import React from "react";
import styles from './Header.module.css';
import Button from "../button/Button";

const Header = ({
                    toggleSearchInitiated,
                    setSearchField,
                }) => {

    function handleSubmit(e) {
        e.preventDefault();
        setSearchField(e.target.elements["search-field"].value);
        toggleSearchInitiated(true);
    }

    let search;
    return (
        <div className={styles["header-container"]}>
            <form onSubmit={handleSubmit} className={styles['search-bar']}>
                <input
                    type="text"
                    name="search-field"
                    placeholder="search recipe"
                    id="search-field"
                    className={styles['search-field']}
                    value={search}
                    onMouseDown={(e) => toggleSearchInitiated(false)}
                />
                <Button type="submit" color="#FCA311" height="2em">Search
                </Button>
            </form>
        </div>
    )
}

export default Header;