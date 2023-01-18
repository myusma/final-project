import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const[username,setUsername]= useState('')
    const[password,setPassword]= useState('')
    const[email,setEmail]= useState('')
    const navigate = useNavigate()

    async function handleSingUp (e){
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:3000/register', {
                email: email,
                password: password,
                username: username,
            })
            console.log(response)
            navigate('/signin')

        }catch (e){
            console.error(e)
        }
    }


    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>

            <form onSubmit={handleSingUp}>
                <label htmlFor="username">Gebruikersnaam : </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                />
                <label htmlFor="email">Email : </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required={true}

                />
                <label htmlFor="password">Wachtwoord : </label>
                <input
                    type="text"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required={true}

                />


                <button type="submit" >Submit</button>
            </form>

            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;