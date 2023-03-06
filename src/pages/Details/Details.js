import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './Details.css'
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'


function Details() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [hotelDetail, setHotelDetail] = useState({})
    const [hotelPhotos, setHotelPhotos] = useState([])
    const [hotelDescription, setHotelDescription] = useState({})
    const [hotelFacilities, setHotelFacilities] = useState([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [dialogImageSrc, setDialogImageSrc] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDetails = async () => {
            try {
                setError(false);
                setLoading(true);

                const options = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
                    params: {locale: 'en-gb', hotel_id: id},
                    headers: {
                        'X-RapidAPI-Key': '388e84d0camshb44a39adef84bc1p1535b4jsn99d40ef6a210',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };

                axios.request(options).then(function (response) {
                    setHotelDetail(response.data)
                    console.log('info', response.data)

                })


                const fotoOptions = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/photos',
                    params: {hotel_id: id, locale: 'en-gb'},
                    headers: {
                        'X-RapidAPI-Key': '388e84d0camshb44a39adef84bc1p1535b4jsn99d40ef6a210',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };

                axios.request(fotoOptions).then(function (response) {
                    console.log(response.data);
                    setHotelPhotos(response.data)
                })

                const description = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/description',
                    params: {hotel_id: id, locale: 'en-gb'},
                    headers: {
                        'X-RapidAPI-Key': '388e84d0camshb44a39adef84bc1p1535b4jsn99d40ef6a210',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };

                axios.request(description).then(function (response) {
                    console.log('description', response.data);
                    setHotelDescription(response.data)
                })

                const facilities = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/facilities',
                    params: {hotel_id: id, locale: 'en-gb'},
                    headers: {
                        'X-RapidAPI-Key': '388e84d0camshb44a39adef84bc1p1535b4jsn99d40ef6a210',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };

                axios.request(facilities).then(function (response) {
                    console.log('facilities', response.data);
                    setHotelFacilities(response.data)
                })

            } catch (error) {
                console.error(error)
                setError(true)
            } finally {
                setLoading(false)
            }

        }
        void getDetails()

    }, [])

    return (

        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}

            {hotelPhotos.length > 0 &&
                <div className="slide-container">
                    <Slide
                        nextArrow={<button className='arrowButton nextArrow'>⮕</button>}
                        prevArrow={<button className='arrowButton prevArrow'>⬅</button>}
                    >

                        {hotelPhotos.map((slideImage, index) => (<div key={index}>
                            <div className='divStyle' style={{'backgroundImage': `url(${slideImage?.url_1440})`}}></div>
                        </div>))}
                    </Slide>
                </div>}


            <div className='itemContainer'>
                {hotelPhotos?.map((item) => {
                    return (

                        <img onClick={() => {
                            setDialogOpen(true)
                            setDialogImageSrc(item?.url_1440)
                        }} className='photoItems' src={item.url_1440}/>
                    )
                })}
            </div>


            <p>{hotelDescription?.description}</p>

            <p><b>Score: {hotelDetail.review_score}</b></p>

            <div>
                <b>Facilities:</b>
                <ul className='facilities'>
                    {hotelFacilities?.map((item) => {
                        return (

                            <li className='innerFacilities'>{item.facility_name}</li>

                        )
                    })}
                </ul>
            </div>

            <dialog className='dialog' open={dialogOpen ? true : false}>

                <div className='dialogContent'>
                    <div className= 'dialogContentTopArea'>
                        <button onClick={()=>{setDialogOpen(false)}}>X</button>
                    </div>

                    <div className='dialogContentBottomArea'>
                        <img className='hotelBigImage' src={dialogImageSrc}/>
                    </div>
                </div>

            </dialog>

            <div className="reservationArea">
                <div className="reservationButtonContainer">
                    <button className="reservationButton" onClick={() => {
                        navigate('/reservation/' + id)
                    }}>Book now
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Details;