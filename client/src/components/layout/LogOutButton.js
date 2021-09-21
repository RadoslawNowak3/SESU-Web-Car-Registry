import React, {useContext} from 'react';
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button"

function LogOutButton()
{
    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();
    async function logOut()
    {
      await axios.get("http://localhost:5001/auth/logout")//await axios.get("https://mern-sesu.herokuapp.com/auth/logout")
      await getLoggedIn();
      history.push("/");
    }
            return <Button className="logout" onClick = {logOut}> Log Out </Button>
}
export default LogOutButton;