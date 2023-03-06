import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Results from './pages/results/Results';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Search from './pages/search/Search'
import Details from './pages/Details/Details'
import './App.css';
import {AuthContext} from "./context/AuthContext";
import Reservation from "./pages/reservation/Reservation";


function App() {

    const {isAuth} = useContext(AuthContext);

    return (
        <>
            <NavBar/>

            <div className="content">

                <Routes>

                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/search" element={isAuth === true ? <Search/> : <Navigate to="/"/>}/>
                    <Route exact path="/results" element={<Results/>}/>
                    <Route exact path="/details/:id" element={<Details/>}/>
                    <Route exact path="/signin" element={<SignIn/>}/>
                    <Route exact path="/signup" element={<SignUp/>}/>
                    <Route exact path="/reservation/:id" element={<Reservation/>}/>

                </Routes>
            </div>
        </>
    );
}

export default App;
