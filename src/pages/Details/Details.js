import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import './Details.css'
import {Slide} from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import {Dialog, DialogContent, IconButton} from "@mui/material";
import {ArrowBackIosOutlined, ArrowForwardIosOutlined} from "@mui/icons-material";


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
    const [ loading, setLoading ] = useState( false )

    useEffect(() => {
        const getDetails = async () => {
            try {
                setError( false );
                setLoading( true );

                const options = {
                    method: 'GET',
                    url: 'https://booking-com.p.rapidapi.com/v1/hotels/data',
                    params: {locale: 'en-gb', hotel_id: id},
                    headers: {
                        'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
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
                        'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
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
                        'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
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
                        'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
                        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
                    }
                };

                axios.request(facilities).then(function (response) {
                    console.log('facilities', response.data);
                    setHotelFacilities(response.data)
                })

            }catch (error){
                console.error(error)
                setError(true)
            }
            finally {
                setLoading(false)
            }

        }
        void getDetails()

    }, [])

    return (

        <div>
            { loading && <p>Loading...</p> }
            { error && <p>Error: Could not fetch data!</p> }

            {hotelPhotos.length > 0 &&
                <div className="slide-container">
                    <Slide
                        // prevArrow={
                        //     <IconButton sx={{
                        //         position: "absolute",
                        //         zIndex: 10,
                        //         left: 0,
                        //         background: "rgba(255,255,255,0.9)",
                        //         "&:hover": {background: "rgba(255,255,255,0.8)",},
                        //         border: "2px solid",
                        //         margin: "5px",
                        //     }} size="small">
                        //         <ArrowBackIosOutlined/>
                        //     </IconButton>
                        // }
                        // nextArrow={
                        //     <IconButton sx={{
                        //         position: "absolute",
                        //         zIndex: 10,
                        //         right: 0,
                        //         background: "rgba(255,255,255,0.9)",
                        //         "&:hover": {background: "rgba(255,255,255,0.8)",},
                        //         border: "2px solid",
                        //         margin: "5px",
                        //     }} size="small">
                        //         <ArrowForwardIosOutlined/>
                        //     </IconButton>}
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
            <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen} fullWidth maxWidth={'sm'}>
                <DialogContent>
                    <div><img className="hotelBigImage" src={dialogImageSrc}/></div>
                </DialogContent>
            </Dialog>

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