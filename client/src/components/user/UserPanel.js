import axios from "axios";
import React, {useEffect, useState} from "react";
import UserInfo from "./UserInfo"
import Container from "react-bootstrap/Container"

function UserPanel(){
    const [user,setUser]= useState();
    const [loading, setLoading]= useState(true);
async function getUser() {
    try {
        const userRes = await axios.get("http://localhost:5001/auth/");
        //const userRes = await axios.get("https://mern-sesu.herokuapp.com/auth/");
        setUser(userRes.data);
        setLoading(false);
    } catch (err) {
        console.log(err)
    }
    }
    useEffect(()=>(
        getUser()
    ),[])
    return(
        <Container>
            {loading ? "Loading..." : <>
                <UserInfo user={user}/>
            </>
            }
        </Container>
    )
}
export default UserPanel;