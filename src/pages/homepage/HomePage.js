import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from './HomePage.module.css';
import loginPage from "../loginpage/LoginPage";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";

const HomePage = ({
                      recipes,
                      setRecipes,
                      searchInitiated,
                      toggleSearchInitiated,
                      searchField,
                      setSearchField,
                      searchFieldTemp,
                      setSearchFieldTemp,
                      fetchSearchData,
                      initialRenderHome,
                      toggleInitialRenderHome
                  }) => {

    const navigate = useNavigate();

    // https://developer.edamam.com/
    const API_ID = process.env.REACT_APP_API_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;

    function getUniqueKey() {
        return Date.now() + Math.random().toString(36).substring(2, 15)
    }

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
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=${API_ID}&app_key=${API_KEY}`);
                console.log(response.data.hits);
                setRecipes(response.data.hits);
            } catch (err) {
                console.error(err);
            }
        }

        if (initialRenderHome === true) {
            console.log("initial effect getriggered");
            void fetchInitialData();
            toggleInitialRenderHome(false);
        }


    }, [initialRenderHome])

    useEffect(() => {

        async function fetchSearchData(search) {

            try {
                const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}&random=true`;
                const response = await axios.get(uri);
                setRecipes(() => response.data.hits);
            } catch (err) {
                console.error(err);
            }
        }

        console.log("effect getriggered");
        void fetchSearchData(searchField);
    }, [searchField]);

    return (
        <main className="outer-container">
            <div className="inner-container">
                <div className={styles["content-container"]}>
                {(Object.keys(recipes).length === 0 && searchInitiated === true) && (
                    <p id="search-not-found-p">Sorry we can't find recipes. Please try again or come back
                        later</p>)}
                {Object.keys(recipes).length > 0 && (
                    <>
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
                        <div className={styles['recipe-article-container']}>
                            {recipes.map((listItem) => {
                                console.log(listItem.recipe.label);
                                return (
                                    <>
                                        <article className={styles['recipe-article']}
                                                 key={getUniqueKey()}>
                                            <img src={listItem.recipe.image} alt={listItem.recipe.label}/>
                                            <h5>{listItem.recipe.dishType}, {listItem.recipe.cuisineType}</h5>
                                            <span>
                                                    <p><Link
                                                        to={`/recipe/${getRecipeId(listItem.recipe.uri)}`}>{listItem.recipe.label}</Link></p>
                                                {/*<p>STAR RATING TODO</p>*/}
                                                </span>
                                        </article>
                                    </>
                                )
                            })}
                        </div>
                    </>
                )}
                {(Object.keys(recipes).length === 0 && searchInitiated === true) &&
                    (<section>
                            <div className={styles['button-container']}>
                                <Button onClick={() => {
                                    setSearchField('');
                                    navigate("/");
                                    setSearchField('');
                                    console.log("button geklikt");
                                }}>
                                    Back
                                </Button>
                            </div>
                        </section>
                    )}
                {(Object.keys(recipes).length !== 0) &&
                    (<section>
                            <div className={styles['button-container']}>
                                <Button onClick={() => {
                                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                    setSearchField(searchField);
                                }
                                }>More
                                </Button>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </main>
    )
}
export default HomePage;