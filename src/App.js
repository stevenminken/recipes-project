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
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";

function App() {

    const {isAuth} = useContext(AuthContext);

    //TODO BEM of CSS modules
    //https://github.com/hogeschoolnovi/novi-educational-backend-documentation
    //mailer captcha

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
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
