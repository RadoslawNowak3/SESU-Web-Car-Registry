import React, {useEffect, useState} from "react";
import UserSearchList from "./UserSearchList"
import axios from "axios";
function CarSearch()
{
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    async function getUsers()
    {
        try {
            const userRes = await axios.get("http://localhost:5001/auth/usersearch/");
            //const userRes = await axios.get("https://mern-sesu.herokuapp.com/auth/usersearch/");
            setUsers(userRes.data);
            setLoading(false)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getUsers()
    },[]);
    return(
        <div>
            {loading ? (
                <p>Loading...</p>):(
                <div>
                    <UserSearchList users={users}/>
                </div>
            )}
        </div>
    )
}

export default CarSearch;