import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({isAuth: false, user: '', password: ''});

    function login(user, password) {
        toggleIsAuth((existingValue) => ({
            // ...existingValue,
            isAuth: true,
            user: user,
            password: password,
        }))
        console.log("de waarde is: " + isAuth.isAuth + " " + isAuth.user);

    }

    function logout() {
        toggleIsAuth((existingValue) => ({
            // ...existingValue,
            isAuth: false,
            user: '',
        }))
        console.log("de waarde is: " + isAuth.isAuth + " " + isAuth.user);
    }

    const data = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        password: isAuth.password,
        login: login,
        logout: logout,
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;