import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const[username,setUsername]= useState('')
    const[password,setPassword]= useState('')
    const[email,setEmail]= useState('')
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [errorUsername, setErrorUsername] =useState(null)
    const [ errorSignUp, setErrorSignUp] = useState(null)
    const navigate = useNavigate()

    function validateSignUp() {
        let errorCount = 0;

        if(username.length <3){
            setErrorUsername('username should be min. 3 digits')
            errorCount++
        } else {
            setErrorUsername(null);
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorEmail("Email is invalid");
            errorCount++;
        } else {
            setErrorEmail(null);
        }

        if (password.length < 3) {
            setErrorPassword("password should be min. 3 digits");
            errorCount++
        } else {
            setErrorPassword(null);
        }
        if (errorCount > 0) {
            return false
        } else {
            return true
        }
    }
    async function handleSingUp (e){
        e.preventDefault()
        if (!validateSignUp()){
            return
        }
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
            setErrorSignUp('email is already exist')
        }
    }


    return (
        <>
            <h1>Sign up and to get started</h1>


            <form onSubmit={handleSingUp}>
                <label htmlFor="username">Username : </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                />
                <label htmlFor="email">Email : </label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required={true}

                />
                <label htmlFor="password">Password : </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required={true}

                />


                <button type="submit" >Submit</button>
                <br/>
                {errorEmail && <h4>{errorEmail}</h4>}
                {errorUsername && <h4>{errorUsername}</h4>}
                {errorPassword && <h4>{errorPassword}</h4>}
                {errorSignUp && <h4>{errorSignUp}</h4>}
            </form>

            <p>Already have an account? Click on <Link to="/signin">Signin</Link> to log in.</p>
            <p>Back to the <Link to="/">Homepage</Link></p>
        </>
    );
}

export default SignUp;