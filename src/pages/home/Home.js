import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <h1>Homepage</h1>
            <section>
                <h2>Search for places to stay by destination</h2>
                <p>Find Accommodations</p>
                <p>Can I really save on places to stay near me and lodging in other popular destinations by using SMART TARAVEL?
                    Yes! SMART TARAVEL searches for Hotels on hundreds of City's to help
                    you find deals on hotels.</p>
                <b/>

                <section>

                    <p>Registration is required. Please click <Link to="/signup">Signup</Link> to create an account</p>
                    <p>Please click <Link to="/signin">Signin</Link> if you already have an account </p>
                    <p>Are you logged in? Please click on <Link to="/search">Search</Link></p>
                </section>
            </section>

        </>
    );
}

export default Home;
