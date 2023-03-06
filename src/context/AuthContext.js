import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});


function AuthContextProvider({children}) {

    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });

    const navigate = useNavigate()

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            const decodedToken = jwtDecode(storedToken)

            if (Math.floor(Date.now() / 1000) < decodedToken.exp) {
                console.log( "De gebruiker is NOG STEEDS ingelogd 🔓" )
                void fetchData(storedToken, decodedToken.sub)
            } else  {
                console.log( "De token is verlopen" )
                localStorage.removeItem( 'token' )
            }
        } else {
            setAuth( {
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            } )
        }
    }, [] )

    function login(jwt) {
        console.log( "De gebruiker is ingelogd 🔓" )
        localStorage.setItem('token', jwt);
        const decodedToken = jwtDecode(jwt)

        void fetchData(jwt, decodedToken.sub, '/search')
    }

    async function fetchData(jwt, id ,redirect) {
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
                status: 'done'
            });
            if (redirect) {
                navigate(redirect)
            }

        } catch (e) {
            console.error(e)
            setAuth({
                ...auth,
                status: 'done'
            })
        }
    }


    function logout() {
        console.log( "De gebruiker is uitgelogd 🔒" )
        localStorage.removeItem( 'token' )
        setAuth( {
            ...auth,
            isAuth: false,
            user: null,
            status: "done"
        } )
        navigate('/');
    }


    const data = {

        login: login,
        logout: logout,
        isAuth: auth.isAuth,
        user: auth.user,
        status: auth.status

    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;