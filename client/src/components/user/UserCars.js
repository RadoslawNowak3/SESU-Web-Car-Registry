import React, {useEffect, useState} from "react";
import CarsList from "../cars/CarsList"
import axios from "axios";
function UserCars()
{
    const [cars, setCars] = useState([]);
    const [loading,setLoading]=useState(true);

    async function getCars()
    {   try {
        const carsRes = await axios.get("http://localhost:5001/car");
        // const carsRes = await axios.get("https://mern-sesu.herokuapp.com/car");
        await setCars(carsRes.data);
        setLoading(false);
        } catch(err){
    }
    }
    useEffect(()=>{
        (getCars())
    },[]);

    return(
    <div>
        {loading ? null : <>
            {cars.length > 0 ?
                <CarsList cars={cars}/> : <p>You have not added any cars yet.</p>}
        </>
        }

    </div>
    )
}

export default UserCars;