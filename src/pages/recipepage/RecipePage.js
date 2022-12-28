import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import {useParams} from "react-router-dom";
import axios from "axios";

const RecipePage = () => {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    console.log("from recipe page: " + id);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=973f4fa3&app_key=d99e219fc4b58e878b793779677dd4ee`);
                console.log(response.data.recipe);
                setRecipe(response.data.recipe);
            } catch (err) {
                console.error(err);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);
    return (
        <>
            <Header>
                <h1>Recipes.com receptpagina</h1>
            </Header>
            <main>
                <section className="outer-container">
                    <div className="inner-container">
                        {Object.keys(recipe).length > 0 && (
                            <div>
                                <img src={recipe.image} width="300px"/>
                                <h3>Title</h3>
                                <p>{recipe.label}</p>
                                <h3>meal Type</h3>
                                <p>{recipe.mealType}</p>
                                <h3>Time</h3>
                                <p>{recipe.totalTime}</p>

                                {/*<span>*/}
                                {/*  <BackIcon className="back-icon"/>*/}
                                {/*  <Link to="/">Take me back</Link>*/}
                                {/*</span>*/}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default RecipePage;