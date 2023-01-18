import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import './Search.css'

function Search() {

    const [formValues, setFormValues] = useState({})
    const [citySearch, setCitySearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedCityList, setSelectedCityList] = useState([])

    useEffect(() => {
        searchCity(citySearch)
    }, [citySearch])

    const searchCity = async (text) => {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
            params: {name: text, locale: 'en-gb'},
            headers: {
                'X-RapidAPI-Key': '5690b94c0bmsh8c0a4adda8fe1e4p10d37ejsn64a61e4746ad',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });

        setCityList(response.data.map((record) => ({
            destId: record.dest_id,
            name: record.name
        })))
    }

    const handleInputChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault()

        console.log(formValues)

        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/search', {
            params: {
                checkin_date: formValues.checkinDate,
                checkout_date: formValues.checkoutDate,
                adults_number: formValues.numberOfGuest,
                room_number: '1',
                locale: 'en-gb',
                order_by: 'price',
                filter_by_currency: 'EUR',
                units: 'metric',
                dest_type: 'city',
                dest_id: selectedCityList[0].destId,
                page_number: '0',


            },
            headers: {
                'X-RapidAPI-Key': '5690b94c0bmsh8c0a4adda8fe1e4p10d37ejsn64a61e4746ad',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }

        });
    }

    return (
        <>
            <div className='search'>

                <h1>Search Page</h1>

                {selectedCityList.map((city) => <p>{city.name}</p>)}

                <form onSubmit={handleFormSubmit}>

                <label htmlFor="city">City </label>
                <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                />

                {cityList.map((city) => <p
                    onClick={() => {
                        setSelectedCityList([...selectedCityList, {
                            name: city.name,
                            destId: city.destId
                        }])
                        setCitySearch('')
                        setCityList([])
                    }}>{city.name}</p>)}



                    <label htmlFor="numberOfGuest">Number of guest:</label>
                    <input
                        type="number"
                        name="numberOfGuest"
                        value={formValues.numberOfGuest}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="checkinDate">Entry Date:</label>
                    <input
                        type="date"
                        name="checkinDate"
                        value={formValues.checkinDate}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="checkoutDate">Checkout Date:</label>
                    <input
                        type="date"
                        name="checkoutDate"
                        value={formValues.checkoutDate}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Search</button>

                </form>


                <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
        </>
    );
}

export default Search;