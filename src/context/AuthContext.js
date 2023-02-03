import React from "react";
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

    const [responseError, toggleResponseError] = useState({
            error: false,
            errorMessage: '',
        }
    );
    const [succesResponse, toggleSuccesResponse] = useState({
        succes: false,
        succesMessage: '',
        succesEmail: false,
        succesMessageEmail: '',
        succesPassword: false,
        succesMessagePassword: '',
    })

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
            // console.error("fetch fout" + e.response);
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
            toggleSuccesResponse(() => {
                return {
                    ...succesResponse,
                    succes: true,
                    succesMessage: response.data.message,
                }
            })
            toggleResponseError(() => {
                return {
                    error: false,
                    errorMessage: '',
                }
            })
            setTimeout(() => {
                navigate('/login');
                toggleSuccesResponse(() => {
                    return {
                        ...succesResponse,
                        succes: false,
                        succesMessage: '',
                    }
                })
            }, 3000);
        } catch (e) {
            // console.error(e.response);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
            setTimeout(() => {
                toggleResponseError(() => {
                    return {
                        error: false,
                        errorMessage: '',
                    }
                })
            }, 3000);
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
            // console.error(e);
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
                    email: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
            if (response.status === 200) {
                toggleResponseError(() => {
                    return {
                        error: false,
                        errorMessage: '',
                    }
                })
                toggleSuccesResponse(() => {
                    return {
                        ...succesResponse,
                        succesEmail: true,
                        succesMessageEmail: 'email updated',
                    }
                })
            }
            if (response.status === 400) {
                throw new Error('Something went wrong, please try again.');
            }
            setAuthentication({
                ...authentication,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    roles: response.data.roles,
                },
                status: 'done',
            });
            setTimeout(() => {
                toggleSuccesResponse(() => {
                    return {
                        ...succesResponse,
                        succesEmail: false,
                        succesMessageEmail: '',
                    }
                })
            }, 3000);
            await fetchUserData();
        } catch
            (e) {
            // console.error(e.response);
            console.log("error update email: " + e.data.message);
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
            toggleSuccesResponse(() => {
                return {
                    ...succesResponse,
                    succesEmail: false,
                    succesMessageEmail: '',
                }
            })
        }
    }

    async function updateUserPassword(password) {
        try {
            const response = await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                    password: password,
                    repeatedPassword: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                    },
                });
            if (response.status === 200) {
                toggleResponseError(() => {
                    return {
                        error: false,
                        errorMessage: '',
                    }
                })
                toggleSuccesResponse(() => {
                    return {
                        ...succesResponse,
                        succesPassword: true,
                        succesMessagePassword: 'password updated',
                    }
                })
            }
            if (response.status === 400) {
                throw new Error('Something went wrong, please try again.');
            }
            setAuthentication({
                ...authentication,
                status: 'done',
            })
            setTimeout(() => {
                toggleSuccesResponse(() => {
                    return {
                        ...succesResponse,
                        succesPassword: false,
                        succesMessagePassword: '',
                    }
                })
            }, 3000);
            await fetchUserData();
        } catch
            (e) {
            // console.error(e.response);
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
            toggleSuccesResponse(() => {
                return {
                    ...succesResponse,
                    succesPassword: false,
                    succesMessagePassword: '',
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
            // console.error(e.response);
            toggleResponseError(() => {
                return {
                    error: true,
                    errorMessage: e.response,
                }
            })
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
        responseError: responseError,
        succesResponse: succesResponse,
        toggleSuccesResponse: toggleSuccesResponse,
        API_ID: API_ID,
        API_KEY: API_KEY,
    };


    return (
        <AuthContext.Provider value={contextData}>
            {authentication.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;