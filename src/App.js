import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import RegistrationPage from "./pages/registrationpage/RegistrationPage";
import HomePage from "./pages/homepage/HomePage";
import RecipePage from "./pages/recipepage/RecipePage";
import LoginPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import ContactPage from "./pages/contactpage/ContactPage";
import Footer from "./components/footer/Footer";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import axios from "axios";
import Header from "./components/header/Header";

function App() {

    const {isAuth} = useContext(AuthContext);

    const [recipes, setRecipes] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [searchInitiated, toggleSearchInitiated] = useState(false);

    const API_ID = process.env.REACT_APP_API_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;

    async function fetchSearchData(search) {

        try {
            const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${API_ID}&app_key=${API_KEY}&random=true`;
            const response = await axios.get(uri);
            console.log(response.data.hits);
            setRecipes(() => response.data.hits);
        } catch (err) {
            console.error(err);
        }
    }

    //TODO BEM of CSS modules
    //https://github.com/hogeschoolnovi/novi-educational-backend-documentation
    //mailer captcha

    return (
        <>
            <Header
                recipes={recipes}
                setRecipes={setRecipes}
                searchInitiated={searchInitiated}
                toggleSearchInitiated={toggleSearchInitiated}
                searchField={searchField}
                setSearchField={setSearchField}
                fetchSearchData={fetchSearchData}
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
                        fetchSearchData={fetchSearchData}
                    />}/>
                <Route path="/recipe/:id" element={<RecipePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile" element={isAuth === true ? <ProfilePage/> : <Navigate to="/"/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Footer/>
        </>
    );
}
export default App;
