import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './HomePage.module.css';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import {returnRandomSearchQuery} from "../../helpers/functions";
import {AuthContext} from "../../context/AuthContext";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

const HomePage = ({
                      searchField,
                      setSearchField,
                  }) => {

    const {API_ID, API_KEY} = useContext(AuthContext);
    const navigate = useNavigate();

    const [loadingError, toggleLoadingError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

    const [recipes, setRecipes] = useState({});
    const [nextUrl, setNextUrl] = useState('');
    const [searchInitiated, toggleSearchInitiated] = useState(false);

    function getRecipeId(uri) {
        const word = 'recipe_';
        const index = uri.indexOf(word);
        const length = word.length;
        const result = uri.slice(index + length);

        return result
    }

    async function fetchRecipesData(searchterm) {

        try {
            if (searchterm === '') {
                searchterm = returnRandomSearchQuery();
            }
            if (searchterm === "MORE") {
                const uri = nextUrl;
                await axios.get(uri).then((response) => {
                    setRecipes(() => response);
                    setNextUrl(response.data._links.next.href);
                });
            } else {
                const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchterm}&app_id=${API_ID}&app_key=${API_KEY}`;
                await axios.get(uri).then((response) => {
                    setRecipes(() => response);
                    setNextUrl(response.data._links.next.href);
                });
            }
            toggleLoadingError(false);
            setLoadingErrorMessage('');
        } catch (err) {
            toggleLoadingError(true);
            setLoadingErrorMessage("Probably too many fetch requests. Please try again later. Error: " + err.message);
        }
    }

    useEffect(() => {
        async function searchRecipes(searchterm) {
            await fetchRecipesData(searchterm);
        }

        void searchRecipes(searchField);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchField]);

    return (
        <main className="outer-container">
            <div className="inner-container">
                <div className={styles["content-container"]}>
                    <Header
                        toggleSearchInitiated={toggleSearchInitiated}
                        setSearchField={setSearchField}
                    />
                    {!loadingError && (
                        <>
                            {(Object.keys(recipes).length === 0 && searchInitiated === true) && (
                                <p id="search-not-found-p">Sorry we can't find recipes. Please try again or come back
                                    later</p>)}
                            {Object.keys(recipes).length > 0 && (
                                <div className={styles['recipe-article-container']}>
                                    {recipes.data.hits.map((listItem) => {
                                        return (
                                            <article className={styles['recipe-article']}
                                                     key={uuidv4()}>
                                                <img src={listItem.recipe.image} alt={listItem.recipe.label}/>
                                                <h5>{listItem.recipe.dishType}, {listItem.recipe.cuisineType}</h5>
                                                <span>
                                                    <p><Link
                                                        to={`/recipe/${getRecipeId(listItem.recipe.uri)}`}>{listItem.recipe.label}</Link></p>
                                                </span>
                                            </article>
                                        )
                                    })}
                                </div>)}
                        </>)}
                    <div className={styles['button-container']}>
                        {loadingError && (
                            <h2 className={styles['loading-error']}>{loadingErrorMessage}</h2>
                        )}
                        {(Object.keys(recipes).length === 0 && searchInitiated === true) &&
                            (<section>
                                    <Button onClick={() => {
                                        navigate('/');
                                        setSearchField(returnRandomSearchQuery());
                                    }}>
                                        Back
                                    </Button>n
                                </section>
                            )}
                        {(Object.keys(recipes).length !== 0) &&
                            (<section>
                                    <Button onClick={() => {
                                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                        fetchRecipesData("MORE");
                                    }
                                    }>More
                                    </Button>
                                </section>
                            )}
                    </div>
                </div>
            </div>
        </main>
    )
}
export default HomePage;