import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import RegistrationPage from "./pages/registrationpage/RegistrationPage";
import HomePage from "./pages/homepage/HomePage";
import RecipePage from "./pages/recipepage/RecipePage";
import LoginPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import ContactPage from "./pages/contactpage/ContactPage.module";
import Footer from "./components/footer/Footer";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import Header from "./components/header/Header";
import jwt_decode from 'jwt-decode';

function App() {

    const {isAuth} = useContext(AuthContext);
    // const token = AAAABBBBBCCCC;

    const [recipes, setRecipes] = useState([]);
    const [searchFieldTemp, setSearchFieldTemp] = useState('');
    const [searchField, setSearchField] = useState('');
    const [searchInitiated, toggleSearchInitiated] = useState(false);
    const [initialRenderHome, toggleInitialRenderHome] = useState(true);

    //TODO BEM of CSS modules
    //https://github.com/hogeschoolnovi/novi-educational-backend-documentation
    //mailer captcha

    return (
        <>
            <div className="outer-container">
                <div className="inner-container">
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
                    >
                    </Header>
                    <Routes>
                        <Route path="/" element={
                            <HomePage
                                recipes={recipes}
                                setRecipes={setRecipes}
                                searchInitiated={searchInitiated}
                                toggleSearchInitiated={toggleSearchInitiated}
                                searchField={searchField}
                                setSearchField={setSearchField}
                                initialRenderHome={initialRenderHome}
                                toggleInitialRenderHome={toggleInitialRenderHome}

                            />}/>
                        <Route path="/recipe/:id" element={<RecipePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/profile" element={isAuth === true ? <ProfilePage/> : <Navigate to="/"/>}/>
                        <Route path="/registration" element={<RegistrationPage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default App;
