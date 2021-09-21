import React, {useEffect, useState} from "react";
import CarsSearchList from "./CarsSearchList"
import axios from "axios";

function CarSearch()
{
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState([]);
       async function getCars()
    {
        try {
             const carsRes = await axios.get("http://localhost:5001/car/carsearch/");
            // const carsRes = await axios.get("https://mern-sesu.herokuapp.com/car/carsearch/");
            setCars(carsRes.data);
            setLoading(false)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getCars()
    },[]);

    return(
        <div>
            {loading ? <p>Loading</p> : (
                    <div>
            <CarsSearchList cars={cars}/>
                    </div>
                )}
        </div>
    )
}

export default CarSearch;