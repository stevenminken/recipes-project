import styles from './Header.module.css';
import Button from "../button/Button";

const Header = ({
                    toggleSearchInitiated,
                    setSearchField,
                    searchFieldTemp,
                    setSearchFieldTemp
                }) => {

    function handleSubmit(e) {
        e.preventDefault();
        setSearchField(searchFieldTemp);
        toggleSearchInitiated(true);
    }

    return (
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
                <Button type="submit" color="#FCA311" height="2em">Search
                </Button>
            </form>
        </div>
    )
}

export default Header;