import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function SignIn() {

    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    console.log(email)


    async function handleLogin (e){
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:3000/login', {
                email: email,
                password: password,
            })
            console.log(response)
            login(response.data.accessToken)

        }catch (e){
            console.error(e)
        }

    }


    return (
        <>
            <h1>Signin</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleLogin}>
                <div>

                    <label htmlFor="email">Email : </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </div>
                <button type="submit" >Inloggen</button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;