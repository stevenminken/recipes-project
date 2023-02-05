import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './HomePage.module.css';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import {returnRandomSearchQuery} from "../../helpers/functions";
import {AuthContext} from "../../context/AuthContext";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

const HomePage = ({searchField, setSearchField}) => {

    const {API_ID, API_KEY} = useContext(AuthContext);
    const navigate = useNavigate();

    const [loadingError, toggleLoadingError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState('');
    const [searchInitiated, toggleSearchInitiated] = useState(false);

    const [recipesList, setRecipesList] = useState([]);

    function getRecipeId(uri) {
        const word = 'recipe_';
        const index = uri.indexOf(word);
        const length = word.length;
        const result = uri.slice(index + length);

        return result
    }

    async function fetchRecipesData(searchterm) {
        try {
            if (API_KEY === null || API_KEY === undefined) {
                throw new Error("Please provide API keys in .env file according to the instructions in README.md");
            }

            if (searchterm === '') {
                searchterm = returnRandomSearchQuery();
            }
            if (searchterm === "BACK") {
                setRecipesList(prevRecipesList => {
                    const newRecipesList = [...prevRecipesList];
                    newRecipesList.splice(newRecipesList.length - 1, 1);
                    return newRecipesList;
                });
            } else {
                const uri = searchterm === "MORE"
                    ? recipesList[recipesList.length - 1].next
                    : `https://api.edamam.com/api/recipes/v2?type=public&q=${searchField}&app_id=${API_ID}&app_key=${API_KEY}`;

                await axios.get(uri).then((response) => {
                    if (response.data.hits.length === 0) {
                        throw new Error("Recipe not found. Please try again");
                    }
                    setRecipesList(prevRecipesList => [...prevRecipesList, {
                        items: response.data.hits,
                        next: response.data._links.next.href,
                    }]);
                });
            }
            toggleLoadingError(false);
            setLoadingErrorMessage('');
        } catch (err) {
            toggleLoadingError(true);
            setLoadingErrorMessage(err.message);
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
                            {(Object.keys(recipesList).length === 0 && searchInitiated === true) && (
                                <p id="search-not-found-p">Sorry we can't find recipes. Please try again or come back
                                    later</p>)}
                            {Object.keys(recipesList).length > 0 && (
                                <div className={styles['recipe-article-container']}>
                                    {recipesList[recipesList.length - 1].items.map((listItem) => {
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
                            <div>
                                <h2>Sorry, there was a problem:</h2>
                                <h2 className={styles['loading-error']}>{loadingErrorMessage}</h2>
                            </div>
                        )}
                        {(Object.keys(recipesList).length === 0 && searchInitiated === true) &&
                            (<section>
                                    <Button onClick={() => {
                                        navigate('/');
                                        setSearchField(returnRandomSearchQuery());
                                    }}>
                                        Back
                                    </Button>
                                </section>
                            )}
                        {(Object.keys(recipesList).length !== 0) &&
                            (<section className={(recipesList.length > 1) ? styles['button-section-back-more'] : styles['button-section-more']}>
                                    {(Object.keys(recipesList).length > 1) && (
                                        <Button onClick={() => {
                                            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                            void fetchRecipesData("BACK");
                                        }

                                        }>Back
                                        </Button>
                                    )}
                                    <Button onClick={() => {
                                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                        void fetchRecipesData("MORE");
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