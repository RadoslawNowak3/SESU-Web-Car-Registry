import React, {useEffect, useState} from "react";
import TransactionsList from "./TransactionsList"
import axios from "axios";
function UserTransactions()
{
    const [sentTrans, setSentTrans] = useState([]);
    const [recTrans, setRecTrans] = useState([]);
    const [loading,setLoading]=useState(true);
    const type = "Sent";
    const type2= "Received";
    async function getTrans()
    {   try {
        const sentRes = await axios.get("http://localhost:5001/tran/usertrans/sent");
        const recRes = await axios.get("http://localhost:5001/tran/usertrans/received");
        //const sentRes = await axios.get("https://mern-sesu.herokuapp.com/tran/usertrans/sent");
        //const recRes = await axios.get("https://mern-sesu.herokuapp.com/tran/usertrans/received");
        await setSentTrans(sentRes.data);
        await setRecTrans(recRes.data);
        setLoading(false);
    } catch(err){
    }
    }
    useEffect(()=>{
        getTrans()
    },[]);

    return(
        <div>
            {loading ? "Loading..." : <>
                <p><strong>Incoming transactions</strong></p>
                <TransactionsList trans={recTrans} type={type2}/>
                <p></p>
                <p><strong>Outgoing transactions</strong></p>
                <TransactionsList trans={sentTrans} type={type}/>

            </>
            }
        </div>
    )
}

export default UserTransactions;