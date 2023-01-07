import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import './HomePage.css';

const HomePage = ({recipes, setRecipes, searchInitiated, toggleSearchInitiated, searchField, setSearchField}) => {

    useEffect(() => {
        console.log("de recepten zij gewijzigd homepage: ");
    },[recipes])

    async function fetchSearchData(search) {

        try {
            const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee&random=true`);
            console.log(response.data.hits);
            setRecipes(response.data.hits);
        } catch (err) {
            console.error(err);
        }
    }

    const navigate = useNavigate();

    // https://developer.edamam.com/
    const APP_ID = "973f4fa3";
    const API_KEY = "d99e219fc4b58e878b793779677dd4ee";


    function getRecipeId(uri) {
        const word = 'recipe_';
        const index = uri.indexOf(word);
        const length = word.length;
        const result = uri.slice(index + length);

        console.log("getRecipeId: " + result);
        return result;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee');
                console.log(response.data.hits);
                setRecipes(response.data.hits);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <main>
                <section className="outer-container">
                    <div className="inner-container">
                        {(Object.keys(recipes).length === 0 && searchInitiated === true) && (
                            <p id="search-not-found-p">Sorry we can't find recipes. Please try again or come back
                                later</p>)}
                        {Object.keys(recipes).length > 0 && (
                            <>
                                <div className="recipe-article-container">
                                    {recipes.map((listItem) => {
                                        return (
                                            <>
                                                {console.log(listItem.recipe.uri)}
                                                <article className="recipe-article"
                                                         key={getRecipeId(listItem.recipe.uri)}>
                                                    <img src={listItem.recipe.image} alt={listItem.recipe.label}
                                                         width="150px"/>
                                                    <h5>{listItem.recipe.dishType}</h5>
                                                    <h4>{listItem.recipe.label}</h4>

                                                    <span>
                                                    <p><Link
                                                        to={`/recipe/${getRecipeId(listItem.recipe.uri)}`}>{listItem.recipe.label}</Link></p>
                                                    <p>STAR RATING TODO</p>
                                                </span>
                                                </article>
                                            </>
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </section>
                {(Object.keys(recipes).length === 0 && searchInitiated === true) &&
                    (<section className="outer-container">
                            <div className="inner-container button-container">
                                <button className="back-button" onClick={() => {
                                    setSearchField('');
                                    navigate("/");
                                    setRecipes(fetchSearchData('dutch'));
                                    console.log("button geklikt");
                                }}>
                                    Back
                                </button>

                            </div>
                        </section>
                    )}
                {(Object.keys(recipes).length !== 0) &&
                    (<section className="outer-container">
                            <div className="inner-container button-container">
                                <button className="more-button" onClick={() => {
                                    setRecipes(fetchSearchData(searchField));
                                    console.log("we zijn  hier " + recipes);
                                    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                }
                                }>More
                                </button>

                            </div>
                        </section>
                    )}
            </main>
        </>
    )
}
export default HomePage;