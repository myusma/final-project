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
              SMART TARAVEL
            </h3>

          </span>
            </Link>

            <div className='navbar-div'>

                {isAuth ?

                    <>

                        <span>{user && user.email}  </span>
                        <button type="button" onClick={logout}>Logout</button>


                    </>

                    :

                    <>

                        <button type="button" onClick={() => navigate('/signin')}>Login</button>
                        <button type="button" onClick={() => navigate('/signup')}>Signup</button>

                    </>

                }


            </div>
        </nav>
    );
}

export default NavBar;