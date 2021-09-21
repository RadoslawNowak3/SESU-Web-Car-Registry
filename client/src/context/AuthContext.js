import React , {useState,useEffect,createContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthContextProvider(props){
    const [loggedIn, setLoggedIn] = useState(false);
    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:5001/auth/loggedIn")
        // const loggedInRes = await axios.get("https://mern-sesu.herokuapp.com/auth/loggedIn")
        await setLoggedIn(loggedInRes.data);
    }
    useEffect(()=>{
        getLoggedIn();
    },[]);
        return <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
}
export default AuthContext;
export {AuthContextProvider};