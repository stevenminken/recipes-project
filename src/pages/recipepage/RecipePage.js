import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import styles from './RecipePage.module.css';
import {v4 as uuidv4} from 'uuid';
import {AuthContext} from "../../context/AuthContext";

const RecipePage = () => {
        const {API_ID, API_KEY} = useContext(AuthContext);
        const [recipe, setRecipe] = useState({});
        const {id} = useParams();

        const [loadingError, toggleLoadingError] = useState(false);
        const [loadingErrorMessage, setLoadingErrorMessage] = useState('');

        useEffect(() => {
                async function fetchData() {
                    try {
                        await axios.get(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${API_ID}&app_key=${API_KEY}`).then((response) => {
                            setRecipe(response.data.recipe);
                        })
                        toggleLoadingError(false);
                        setLoadingErrorMessage('');
                    } catch
                        (err) {
                        toggleLoadingError(true);
                        setLoadingErrorMessage("status code: " + err.response.status + " " + err.response.data[0].message);
                    }
                }

                if (id) {
                    void fetchData();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [id]
        )
        ;
        return (
            <div className="outer-container">
                <div className="inner-container">
                    <main className={styles["main-div"]}>
                        {loadingError && (
                            <div className={styles['error-div']}>
                                <h2>Sorry, there was a problem:</h2>
                                <h2 className={styles['loading-error']}>{loadingErrorMessage}</h2>
                            </div>
                        )}
                        {Object.keys(recipe).length > 0 && (
                            <div className={styles["content-div"]}>
                                <h2 className={styles["title"]}>{recipe.label}</h2>
                                <div className={styles["top-div"]}>
                                    <img src={recipe.image} alt={recipe.label} className={styles["image"]}/>
                                    <div className={styles["details-div"]}>
                                        <h4 className={styles['recipe-h4-title']}>Mealtype</h4>
                                        <p>{recipe.mealType}</p>
                                        <h4 className={styles['recipe-h4-title']}>Cuisinetype</h4>
                                        <p>{recipe.cuisineType}</p>
                                        <h4 className={styles['recipe-h4-title']}>Ingredients</h4>
                                        <ul className={styles["ingredient-list"]}>
                                            {recipe.ingredients.map((ingredient) => {
                                                return (
                                                    <li className={styles["ingredient-text"]}
                                                        key={uuidv4()}>{ingredient.text}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles["steps-div"]}>
                                    <h3>STEPS</h3>
                                    <ol className={styles['recipe-step-list']}>
                                        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                                        <li>Dicta enim et facilis ipsa officia quisquam reprehenderit sapiente sunt tempore
                                            ullam!
                                        </li>
                                        <li>Ab accusantium animi assumenda consequatur deleniti dicta dolorum eius et,
                                            exercitationem impedit laboriosam libero.
                                        </li>
                                        <li>Maiores natus nemo non numquam omnis perspiciatis quae quas quasi quibusdam,
                                            quidem
                                            quod sit sunt tempora vel veniam.
                                        </li>
                                        <li>Ad amet blanditiis commodi consectetur consequuntur culpa cum debitis, doloribus
                                            enim error esse expedita fugiat illo in inventore iste iusto laborum mollitia
                                            nemo
                                            nisi nobis nostrum omnis optio pariatur perspiciatis quidem.
                                        </li>
                                        <li>Uo quod ratione rerum saepe sequi sit tenetur, voluptas. Ipsa laboriosam
                                            necessitatibus nesciunt obcaecati, perferendis quo rem ut vero? Et, magnam
                                            minus!
                                            Asperiores commodi esse, explicabo in maiores
                                        </li>
                                        <li>minus obcaecati quidem sunt, temporibus veniam veritatis voluptate. Amet aperiam
                                            commodi consectetur consequuntur dignissimos distinctio eaque ipsum,
                                        </li>
                                        <li>mollitia natus numquam obcaecati officia optio pariatur perspiciatis possimus
                                            quaerat quam quidem quisquam ratione recusandae repellendus, ullam vero
                                            voluptas.
                                        </li>
                                        <li>Fugit iure tempora veniam voluptas voluptatibus? Ab aliquid aspernatur aut
                                            commodi
                                            consequatur ducimus eaque eos esse eum in inventore ipsum iusto magni minus non
                                            odit
                                            pariatur placeat quaerat quibusdam quod,
                                        </li>
                                        <li>ratione reprehenderit sapiente sint temporibus unde. Excepturi iusto mollitia
                                            non
                                            nulla rem similique, voluptate. Eligendi enim, eveniet fugit maxime qui quod
                                            sint
                                            tenetur.
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        );
    }
;

export default RecipePage;