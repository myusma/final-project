import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import './Results.css'


function Results() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {checkin_date, checkout_date, adults_number, dest_id} = state
    const [hotelList, setHotelList] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [priceLowToHigh, setPriceLowToHigh] = useState(true)


    useEffect(() => {
        const getData = async () => {
            try {
                setError(false);
                setLoading(true);

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
                        'X-RapidAPI-Key': '388e84d0camshb44a39adef84bc1p1535b4jsn99d40ef6a210',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }

                });
                console.log("acd", response.data.result)
                setHotelList(response.data.result)
            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }

        }

        void getData()
    }, [])


    function selectByPrice() {
        let hotels = [...hotelList]
        setHotelList([])
        if (priceLowToHigh) {
            hotels.sort((a, b) => {
                return a.min_total_price - b.min_total_price
            })
            setPriceLowToHigh(false)
        } else {
            hotels.sort((a, b) => {
                return b.min_total_price - a.min_total_price
            })
            setPriceLowToHigh(true)
        }
        setHotelList(hotels)
    }

    return (
        <>
            <div>
                <button onClick={() => {
                    selectByPrice()
                }}>
                    Select by price

                </button>
            </div>

            <div>


                {loading && <p>Loading...</p>}
                {error && <p>Error: Could not fetch data!</p>}

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