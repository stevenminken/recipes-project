import React, {useContext, useState} from "react";
import {AuthContext} from "./context/AuthContext";
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
import NavBar from "./components/navbar/NavBar";
import PrivacyPolicyPage from "./pages/privacypolicy/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/termsofuse/TermsOfUsePage";
import AdminPage from "./pages/adminpage/AdminPage";
import Filler from "./components/filler/Filler";

function App() {

    const {isAuth} = useContext(AuthContext);
    const [searchField, setSearchField] = useState('');

    return (
        <div>
            <Filler/>
            <NavBar
                setSearchField={setSearchField}
            />
            <Routes>
                <Route path="/" element={
                    <HomePage
                        searchField={searchField}
                        setSearchField={setSearchField}
                    />}/>
                <Route path="/recipe/:id" element={<RecipePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile"
                       element={isAuth === true ? <ProfilePage
                               setSearchField={setSearchField}/> :
                           <Navigate to="/"/>}/>
                <Route path="/admin"
                       element={isAuth === true ? <AdminPage/> :
                           <Navigate to="/"/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/privacypolicy" element={<PrivacyPolicyPage/>}/>
                <Route path="/termsofuse" element={<TermsOfUsePage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="*" element={<NotFoundPage setSearchField={setSearchField}/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
