import React, {useEffect} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";


function Details() {

    const {id}= useParams()


    // useEffect(() => {
    //     const getDetails = async () => {
    //             const options = {
    //                 method: 'GET',
    //                 url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
    //                 params: {locale: 'en-gb', hotel_id: id},
    //                 headers: {
    //                     'X-RapidAPI-Key': '5690b94c0bmsh8c0a4adda8fe1e4p10d37ejsn64a61e4746ad',
    //                     'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
    //                 }
    //             };
    //
    //             axios.request(options).then(function (response) {
    //                 console.log(response.data);
    //             }).catch(function (error) {
    //                 console.error(error);
    //             });
    //
    //
    //     }
    //     void getDetails()
    //
    // }, [])

    return (
        <div></div>
    );
}

export default Details;