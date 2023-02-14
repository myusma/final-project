import React from 'react';
import {Link} from "react-router-dom";
import foto1 from '../../assets/foto1.png'
import foto2 from '../../assets/foto2.jpg'
import foto3 from '../../assets/foto3.jpg'
import foto4 from '../../assets/foto4.jpg'
import foto5 from '../../assets/foto5.jpg'
import foto6 from '../../assets/foto6.jpg'
import foto7 from '../../assets/foto7.webp'
import foto8 from '../../assets/foto8.jpg'
import './Home.css'

function Home() {
    return (
        <div className='contentHome'>
            <h1>Homepage</h1>
            <section>
                <h2>Search for places to stay by destination</h2>
                <p>Find Accommodations</p>
                <p>Can I really save on places to stay near me and lodging in other popular destinations by using SMART
                    TARAVEL?
                    Yes! SMART TARAVEL searches for Hotels on hundreds of City's to help
                    you find deals on hotels.</p>
                <b/>

                <section>

                    <p>Registration is required. Please click <Link to="/signup">Signup</Link> to create an account</p>
                    <p>Please click <Link to="/signin">Signin</Link> if you already have an account </p>
                    <p>Are you logged in? Please click on <Link to="/search">Search</Link></p>
                </section>

                <span className='OuterContainerFotoHome'>

                    <div className='innerContainerFotoHome'>
                        <img className='fotoHome' src={foto1} alt="foto1"/>
                        <img className='fotoHome' src={foto2} alt="foto2"/>
                        <img className='fotoHome' src={foto3} alt="foto3"/>
                        <img className='fotoHome' src={foto4} alt="foto4"/>
                        <img className='fotoHome' src={foto5} alt="foto5"/>
                        <img className='fotoHome' src={foto6} alt="foto6"/>
                        <img className='fotoHome' src={foto7} alt="foto7"/>
                        <img className='fotoHome' src={foto8} alt="foto8"/>
                    </div>

                </span>


            </section>


        </div>
    );
}

export default Home;
