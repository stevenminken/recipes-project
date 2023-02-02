import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import {getCurrentTime} from "../helpers/functions";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const API_ID = process.env.REACT_APP_API_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const navigate = useNavigate();

    const [authentication, setAuthentication] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
        roles: null,
    });

    const [loadingError, toggleLoadingError] = useState(false);
    const [loadingErrorMessage, setLoadingErrorMessage] = useState('');
    const [responseError, toggleResponseError] = useState({
            error: false,
            errorMessage: '',
        }
    );

    useEffect(() => {
        const token = getToken();

        let tokenNotExpired = false;
        if (token) {
            const decodedToken = jwtDecode(token);
            tokenNotExpired = getCurrentTime() < decodedToken.exp;
        }
        if (token && tokenNotExpired) {
            void fetchUserData();
        } else {
            setAuthentication({
                isAuth: false,
                user: null,
                status: 'done',
            });
            // navigate('/');
        }
    }, []);

    function getToken() {
        return localStorage.getItem('token');
    }

    async function fetchUserData() {
        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            setAuthentication({
                ...authentication,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    roles: response.data.roles,
                    id: response.data.id,
                },
                status: 'done',
            });

        } catch (e) {
            console.error("fetch fout" + e.response);
            setAuthentication({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    async function register(username, email, password, role) {
        toggleResponseError(false);
        let roles;
        if (role === "admin") {
            roles = ["user", "admin"];
        } else {
            roles = ["user"];
        }

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signup`, {
                "username": username,
                "email": email,
                "password": password,
                "roles": roles,
            });
            navigate('/login');
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
        } catch (e) {
            console.error(e.response);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
        }
    }

    async function login(username, password) {
        toggleResponseError(false);

        try {
            const response = await axios.post(`https://frontend-educational-backend.herokuapp.com/api/auth/signin`, {
                username: username,
                password: password,
            });
            localStorage.setItem('token', response.data.accessToken);
            await fetchUserData();
            navigate('/profile');
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
        } catch (e) {
            console.error(e);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
        }
    }

    function logout() {
        setAuthentication({
            isAuth: false,
            user: null,
            status: 'done'
        });
        navigate('/');
        localStorage.removeItem('token');
    }

    async function updateUserEmail(email) {
        try {
            const response = await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    name: "steven",
                    email: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
            setAuthentication({
                ...authentication,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    roles: response.data.roles,
                },
                status: 'done',
            });
            fetchUserData();
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
        } catch
            (e) {
            console.error(e.response);
            setAuthentication({
                ...authentication,
                status: 'done',
            })
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
        }
    }

    async function updateUserPassword(password) {
        try {
            await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    password: password,
                    repeatedPassword: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
        } catch
            (e) {
            console.error(e.response);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
        }
    }

    async function requestAllUserData() {
        try {
            const response = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/admin/all`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
            return response.data;
        } catch
            (e) {
            console.error(e.response);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
        }
    }

    async function fetchRecipesData(searchterm) {

        try {
            const uri = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchterm}&app_id=${API_ID}&app_key=${API_KEY}`;
            const response = await axios.get(uri);
            toggleLoadingError(false);
            setLoadingErrorMessage('');
            return response;
        } catch (err) {
            console.error(err);
            toggleLoadingError(true);
            setLoadingErrorMessage("To many fetch requests. Blocked by CORS policy. Please try again later");
        }
    }


    const contextData = {
        isAuth: authentication.isAuth,
        user: authentication.user,
        status: authentication.status,
        register: register,
        login: login,
        logout: logout,
        updateUserEmail: updateUserEmail,
        updateUserPassword: updateUserPassword,
        requestAllUserData: requestAllUserData,
        fetchRecipesData: fetchRecipesData,
        responseError: responseError,
        loadingError: loadingError,
        loadingErrorMessage: loadingErrorMessage,
    };


    return (
        <AuthContext.Provider value={contextData}>
            {authentication.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;