import './Reservation.css'
import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";


const Reservation = () => {

    const {id} = useParams()
    const [hotelData, setHotelData] = useState({})
    const [errorBankAccount, setErrorBankAccount] = useState(null)
    const [bankAccountNumber, setBankAccountNumber] = useState(null)


    useEffect(() => {
        const getDetails = async () => {
            const options = {
                method: "GET",
                url: "https://booking-com.p.rapidapi.com/v1/hotels/data",
                params: {locale: "en-gb", hotel_id: id},
                headers: {
                    "X-RapidAPI-Key": "0cc531a7a2msh8cbb54b572e8654p1cbd69jsn55287375b7d4",
                    "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
                },
            };
            axios.request(options).then(function (response) {
                setHotelData(response.data)
                console.log("hotel data", response.data);
            }).catch(function (error) {
                console.error(error);
            });
        };
        void getDetails();
    }, [id])

    useEffect(()=>{
        function validation(){
            let expression = /[a-zA-Z0-9]{18}/;
            if(!expression.test(bankAccountNumber)){
                setErrorBankAccount('Bankaccoun number should have 18 digits')
            }else {
                setErrorBankAccount(null)
            }

        }
        validation()
    },[bankAccountNumber])

    function pay(){
        if(!errorBankAccount && bankAccountNumber){
            alert("payment received successfully !")
        }
    }

    return (

        <div className='paymentContainer'>
            <div>
                <h2>{hotelData?.name}</h2>
                Bank Account Number :
                <input
                type='text' onChange={(e) => setBankAccountNumber(e.target.value)}>
                </input>
                <br/>
                <br/>
                <button onClick={() => pay()}>Pay</button>
                {errorBankAccount && <h4 style={{color: 'red'}}>{errorBankAccount}</h4>}
            </div>
        </div>
    );
};

export default Reservation;