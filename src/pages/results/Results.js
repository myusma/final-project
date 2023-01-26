import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";


function Results(hotelList) {
    const [list, setList] = useState([])


    useEffect(() => {
        setList(hotelList)
    }, [hotelList])


    // const options = {
    //     method: 'GET',
    //     url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
    //     params: {locale: 'en-gb', hotel_id: '1377073'},
    //     headers: {
    //         'X-RapidAPI-Key': '5690b94c0bmsh8c0a4adda8fe1e4p10d37ejsn64a61e4746ad',
    //         'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    //     }
    // };
    //
    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    // }).catch(function (error) {
    //     console.error(error);
    // });


    return (
        <>


            {/*<div>*/}

            {/*    /!*{list.map((hotel) => {*!/*/}
            {/*    /!*    return (*!/*/}
            {/*    /!*        <article key={hotel.hotel_id}>*!/*/}

            {/*                /!*<h3><a> {hotel.address}</a></h3>*!/*/}

            {/*                /!*<div>*!/*/}
            {/*                /!*    <p><Link className='paragraaf' to={`/subreddit/${reddit.data.subreddit}`}>{reddit.data.subreddit_name_prefixed}</Link></p>*!/*/}
            {/*                /!*    <p>{reddit.data.num_comments} - Ups: {reddit.data.ups}</p>*!/*/}
            {/*                /!*</div>*!/*/}

            {/*            </article>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</div>*/}



            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Results;