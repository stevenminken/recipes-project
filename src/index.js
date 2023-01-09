import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from  './index.module.css';
import {BrowserRouter as Router} from "react-router-dom";
import App from './App';
import AuthContextProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);

