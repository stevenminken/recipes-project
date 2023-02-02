import React, {useContext, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './HomePage.module.css';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import {returnRandomSearchQuery} from "../../helpers/functions";
import {AuthContext} from "../../context/AuthContext";
import {v4 as uuidv4} from 'uuid';

const HomePage = ({
                      recipes,
                      setRecipes,
                      searchInitiated,
                      toggleSearchInitiated,
                      searchField,
                      setSearchField,
                      searchFieldTemp,
                      setSearchFieldTemp,
                      initialRenderHome,
                      toggleInitialRenderHome
                  }) => {

    const {fetchRecipesData, loadingError, loadingErrorMessage} = useContext(AuthContext);
    const navigate = useNavigate();

    function getRecipeId(uri) {
        const word = 'recipe_';
        const index = uri.indexOf(word);
        const length = word.length;
        const result = uri.slice(index + length);

        return result
    }

    useEffect(() => {
        async function fetchInitialData() {
            try {
                const recipe = returnRandomSearchQuery();
                const response = await fetchRecipesData(recipe);
                if (response) {
                    setRecipes(() => response.data.hits);
                }
            } catch (err) {
                console.error(err);
            }
        }

        if (initialRenderHome === true) {
            void fetchInitialData();
            toggleInitialRenderHome(false);
        }

    }, [initialRenderHome])


    useEffect(() => {
        async function searchRecipes(searchterm) {
            const response = await fetchRecipesData(searchterm);
            if (response) {
                setRecipes(() => response.data.hits);
            }
        }

        void searchRecipes(searchField);

    }, [searchField]);

    return (
        <main className="outer-container">
            <div className="inner-container">
                <div className={styles["content-container"]}>
                    <Header
                        recipes={recipes}
                        setRecipes={setRecipes}
                        searchInitiated={searchInitiated}
                        toggleSearchInitiated={toggleSearchInitiated}
                        searchField={searchField}
                        setSearchField={setSearchField}
                        initialRenderHome={initialRenderHome}
                        toggleInitialRenderHome={toggleInitialRenderHome}
                        setSearchFieldTemp={setSearchFieldTemp}
                        searchFieldTemp={searchFieldTemp}
                    />
                    {!loadingError && (
                        <>
                            {(Object.keys(recipes).length === 0 && searchInitiated === true) && (
                                <p id="search-not-found-p">Sorry we can't find recipes. Please try again or come back
                                    later</p>)}
                            {Object.keys(recipes).length > 0 && (
                                <div className={styles['recipe-article-container']}>
                                    {recipes.map((listItem) => {
                                        return (
                                            <article className={styles['recipe-article']}
                                                     key={uuidv4()}>
                                                <img src={listItem.recipe.image} alt={listItem.recipe.label}/>
                                                <h5>{listItem.recipe.dishType}, {listItem.recipe.cuisineType}</h5>
                                                <span>
                                                    <p><Link
                                                        to={`/recipe/${getRecipeId(listItem.recipe.uri)}`}>{listItem.recipe.label}</Link></p>
                                                    {/*<p>STAR RATING TODO</p>*/}
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
                                    </Button>
                                </section>
                            )}
                        {(Object.keys(recipes).length !== 0) &&
                            (<section>
                                    <Button onClick={() => {
                                        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                        setSearchField(returnRandomSearchQuery());
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