import React, {useEffect, useState} from "react";
import CarDetails from "./CarDetails"
import {useLocation} from "react-router-dom";
import axios from "axios";


function CarInfo() {
    const location = useLocation();
    const targetCar = location.state;
    const [owner,setOwner]=useState();
    const [error,setError]=useState(false);
    const [loading,setLoading]=useState(true);
   async function getOwner() {
        try {
            console.log(targetCar)
            const userRes = await axios.get("http://localhost:5001/auth/" + targetCar.ownerID);
            //const userRes = await axios.get("https://mern-sesu.herokuapp.com/auth/" + targetCar.ownerID);
            delete targetCar.ownerID;
            setOwner(userRes.data);
            setLoading(false);
        } catch (err) {
            setError(true)
        }
    }
    useEffect(()=>(
        getOwner()
    ),[])

        return (
        <div>
            {loading? <p>Loading...</p> :
                <div>
                        <CarDetails car={targetCar} owner = {owner}/>
                </div>
            }
        </div>
    )
}
export default CarInfo;