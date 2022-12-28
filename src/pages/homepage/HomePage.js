import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import axios from "axios";
import {Link} from "react-router-dom";
import './HomePage.css';

const HomePage = () => {

    const [recipes, setRecipes] = useState([]);
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

// search:
//     https://api.edamam.com/search?app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee&q=pizza
    useEffect(() => {
        async function fetchData() {
            try {
                // const response = await axios.get('https://api.edamam.com/search?app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee&q=pizza');
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
            <Header>
                <h1>Recipes.com homepage</h1>
            </Header>

            <main>
                <section className="outer-container">
                    <div className="inner-container">
                        <h2>Hottest recipes</h2>

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