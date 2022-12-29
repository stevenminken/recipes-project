import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import axios from "axios";
import {Link} from "react-router-dom";
import './HomePage.css';

const HomePage = () => {

    const [recipes, setRecipes] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [searchInitiated, toggleSearchInitiated] = useState(false);

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

    useEffect(() => {
        toggleSearchInitiated(false);
    }, [searchField]);

    async function fetchSearchData(search) {
        try {
            toggleSearchInitiated(true);
            const response = await axios.get(`https://api.edamam.com/search?app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee&q=${search}`);
            console.log(response.data.hits);
            setRecipes(response.data.hits);
        } catch (err) {
            console.error(err);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`
        search-field: ${searchField} 
        `);
        fetchSearchData(searchField);
    }

    return (
        <>
            <Header>
                <h1>Recipes.com homepage</h1>
            </Header>

            <section className="outer-container">
                <div className="inner-container" >
                    <form onSubmit={handleSubmit} className=" search-bar" >
                        <input
                            type="text"
                            name="search-field"
                            placeholder="search recipe"
                            id="search-field"
                            className="search-field"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        <button type="submit" id="search-button" className="search-button">Search</button>
                    </form>
                </div>
            </section>
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
            </main>
        </>
    )
}
export default HomePage;