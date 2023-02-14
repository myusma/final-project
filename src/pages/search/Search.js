import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import './Search.css'

function Search() {
    const navigate = useNavigate()
    const [formValues, setFormValues] = useState({})
    const [citySearch, setCitySearch] = useState('')
    const [cityList, setCityList] = useState([])
    const [selectedCityList, setSelectedCityList] = useState([])

    function handleRemoveCityItem (index){
        const temp = [...selectedCityList]
        temp.splice(index,1)
        setSelectedCityList(temp)
    }


    useEffect(() => {
        searchCity(citySearch)
    }, [citySearch])


    const searchCity = async (text) => {
        const response = await axios.get('https://booking-com.p.rapidapi.com/v1/hotels/locations', {
            params: {name: text, locale: 'en-gb'},
            headers: {
                'X-RapidAPI-Key': '0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });
        console.log('search', response.data)
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


        navigate('/results', {
            state: {
                checkin_date: formValues.checkinDate,
                checkout_date: formValues.checkoutDate,
                adults_number: formValues.numberOfGuest, dest_id: selectedCityList[0].destId
            }
        })

    }

    return (
        <>
            <div className='search'>

                <h1>Search Page</h1>


                {selectedCityList.map((city,index) =>
                    <div className='cityListItem' key={index}>
                        <p>{city.name}</p>
                        <button className='cityListItemButton' onClick={()=>handleRemoveCityItem(index)}>X</button>
                    </div>)}

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


                <p>Back to the <Link to="/">Homepage</Link></p>
            </div>
        </>
    );
}

export default Search;