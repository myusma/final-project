import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: false
    });

    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const decodedToken = jwtDecode(storedToken)

        if (storedToken && Math.floor(Date.now()/1000) < decodedToken.exp) {
            void fetchData(storedToken, decodedToken.sub)
        }else{
            setAuth({
                ...auth,
                isAuth: false,
                user: null
            })
        }
    }, [])

    function login(jwt) {
        setAuth({
            isAuth: true,

        });
        localStorage.setItem('token', jwt);
        const decodedToken = jwtDecode(jwt)
        fetchData(jwt, decodedToken.sub)
        console.log('Gebruiker is ingelogd');
        console.log(jwt)
        navigate('/search');


        void fetchData(jwt, decodedToken.sub)
        navigate('/search')
    }

    async function fetchData(jwt, id) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                }
            })
            console.log(response)

            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    username: response.data.username,
                    email: response.data.email,
                    id: response.data.id,
                },
                status: true
            });


        } catch (e) {
            console.error(e)
            setAuth({
                ...auth,
                status: true
            })
        }
    }


    function logout() {
        setAuth({
            isAuth: false,
            user: null,
            status: true
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }


    const data = {

        login: login,
        logout: logout,
        isAuth: auth.isAuth,
        user: auth.user,
        status:auth.status

    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === true ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;