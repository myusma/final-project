import React, {useContext} from 'react';
import logo from '../assets/hotel-icon-symbol-sign.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import './NavBar.css'

function NavBar() {
    const navigate = useNavigate();

    const {isAuth, logout, user} = useContext(AuthContext);



    return (
        <nav>
            <Link to="/">
          <span className="logo-container">

            <img src={logo} alt="logo"/>
            <h3>
              SMART TRAVEL
            </h3>

          </span>
            </Link>

            <div className='navbar-div'>

                {isAuth ?

                    <>

                        <span>Welcome {user && user.username}  </span>
                        <button className='navButton' type="button" onClick={logout}>Signout</button>


                    </>

                    :

                    <>

                        <button className='navButton' type="button" onClick={() => navigate('/signin')}>Signin</button>
                        <button className='navButton' type="button" onClick={() => navigate('/signup')}>Signup</button>

                    </>

                }


            </div>
        </nav>
    );
}

export default NavBar;