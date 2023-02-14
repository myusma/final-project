import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function SignIn() {

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorLogin, setErrorLogin] = useState(null)

    console.log(email)

    function validateLogin() {
        let errorCount = 0;

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorEmail("Email is invalid");
            errorCount++;
        } else {
            setErrorEmail(null);
        }


        if (errorCount > 0) {
            return false
        } else {
            return true
        }
    }

    async function handleLogin(e) {
        e.preventDefault()

        if (!validateLogin()){
            return
        }
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            })
            console.log('loginStatus', response)
            login(response.data.accessToken)
            setErrorLogin(null)

        } catch (e) {
            console.error(e)
            setErrorLogin('email adress and password does not match ')

        }

    }


    return (
        <>
            <h1>Signin</h1>


            <form onSubmit={handleLogin}>
                <div>

                    <label htmlFor="email">Email : </label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </div>
                <button type="submit">Signin</button>
                <br/>
                {errorEmail && <h4>{errorEmail}</h4>}
                {errorLogin && <h4>{errorLogin}</h4>}

            </form>

            <p>Don´t you have an account yet? Click on <Link to="/signup">Signup</Link> to register.</p>
            <p>Back to the <Link to="/">Homepage</Link></p>
        </>
    );
}

export default SignIn;