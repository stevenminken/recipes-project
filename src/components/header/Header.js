import React, {useContext, useState} from 'react';
import styles from './Header.module.css';
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Header = ({
                    recipes,
                    setRecipes,
                    searchInitiated,
                    toggleSearchInitiated,
                    searchField,
                    setSearchField,
                    fetchSearchData,
                    initialRenderHome,
                    toggleInitialRenderHome,
                    searchFieldTemp,
                    setSearchFieldTemp
                }) => {

    const {isAuth, user, logout} = useContext(AuthContext);
    const [dropdown, toggleDropdown] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
        search-field: ${searchFieldTemp} 
        `);
        setSearchField(searchFieldTemp);
        navigate('/');
        toggleSearchInitiated(true);
    }

    return (
        // <header className="outer-container">
        //     <div className="inner-container">
                <div className={styles["header-container"]}>
                <form onSubmit={handleSubmit} className={styles['search-bar']}>
                    <input
                        type="text"
                        name="search-field"
                        placeholder="search recipe"
                        id="search-field"
                        className={styles['search-field']}
                        value={searchFieldTemp}
                        onChange={(e) => setSearchFieldTemp(e.target.value)}
                        onMouseDown={(e) => toggleSearchInitiated(false)}
                    />
                    <button type="submit" id="search-button" className={styles['search-button']}><span
                        className={styles['material-symbols-outlined']}>Search</span>
                    </button>
                </form>
            </div>
//         </div>
// </header>
)
}

export default Header;