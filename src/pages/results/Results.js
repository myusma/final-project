import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './Results.css'


function Results() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {checkin_date, checkout_date, adults_number, dest_id} = state
    const [hotelList, setHotelList] = useState([])

    useEffect(() =>{
        const getData = async () => {
            const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search', {
                params: {
                    checkin_date: checkin_date,
                    checkout_date: checkout_date,
                    adults_number: adults_number,
                    room_number: '1',
                    locale: 'en-gb',
                    order_by: 'price',
                    filter_by_currency: 'EUR',
                    units: 'metric',
                    dest_type: 'city',
                    dest_id: dest_id,
                    page_number: '0',


                },
                headers: {
                    'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
                    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                }

            });
            console.log("acd", response.data.result)
            setHotelList(response.data.result)
        }
        void getData()

    }, [])


    return (
        <>

            <div>

                {hotelList.map((hotel) => {
                    return (

                        <div className='container' onClick={() => {
                            navigate('/details/' + hotel.hotel_id)
                        }} key={hotel.hotel_id}>



                            <div className='fotoContainer'>
                                <img className='foto' src={hotel.max_photo_url}/>
                            </div>

                            <div className='contentContainer'>
                                <h3>{hotel.hotel_name}</h3>
                                <h3> {hotel.address}</h3>
                                <h3>{hotel.city_trans}</h3>
                                <h3>Total Price : {hotel.min_total_price.toFixed(2)}{hotel.currencycode}</h3>
                                <b>Score: {hotel.review_score}</b>

                            </div>

                        </div>
                    )
                })}
            </div>


            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Results;