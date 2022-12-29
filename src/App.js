import './App.css';
import {Routes, Route} from "react-router-dom";
import RegistrationPage from "./pages/registrationpage/RegistrationPage";
import HomePage from "./pages/homepage/HomePage";
import RecipePage from "./pages/recipepage/RecipePage";
import LoginPage from "./pages/loginpage/LoginPage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import ContactPage from "./pages/contactpage/ContactPage";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/recipe/:id" element={<RecipePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/registration" element={<RegistrationPage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
