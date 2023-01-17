import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [authentication, toggleAuthentication] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwt_decode(token);
            void fetchUserData(decoded.sub, token);
        } else {
            toggleAuthentication({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    },[]);

    function login(JWT) {
        localStorage.setItem('token', JWT);
        const decoded = jwt_decode(JWT);

        void fetchUserData(decoded.sub, JWT);

    }

    function logout() {
        localStorage.clear();

        toggleAuthentication({
            isAuth: false,
            user: null,
            status: 'done',
        });
        navigate('/');
    }

    async function fetchUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            toggleAuthentication({
                ...authentication,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: 'done',
            });
            navigate('/profile');
        } catch (e) {
            console.error(e);
            toggleAuthentication({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    const contextData = {
        isAuth: authentication.isAuth,
        user: authentication.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
            {/*{isAuth.status === 'done' ? children : <p>Loading...</p>}*/}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;