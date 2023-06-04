import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = (props) => {

    // State de login
    const [userLogged, setUserLogged] = useState(false);

    // State del id del usuario
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            setUserLogged(true);
            setToken(token);
        }

        
    }, [])
    
    return (
        <AuthContext.Provider
            value={{
                userLogged,
                setUserLogged,
                token,
                setToken
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;