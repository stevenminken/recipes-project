import React from 'react';
import './NotFoundPage.css';
import Header from "../../components/header/Header";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header>
                <h1>Recipes.com notfoundpage</h1>
            </Header>
            <section className="outer-container">
                <div className="inner-container">
                    <div className="content">
                        <h2>Deze pagina kan niet worden gevonden</h2>
                        <h3>Keer terug naar het hoofdmenu</h3>
                        <button type="button"
                                onClick={() => navigate("/")}>
                            Hoofdmenu
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;