import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import {useLocation,useHistory} from "react-router-dom"
import Button from "react-bootstrap/Button"
import axios from "axios";

function UserSearchList({users}) {
    let location = useLocation();
    let history = useHistory();
    async function handleSubmit(props)
    {
        const transactionData={
            newOwner:props._id,
            carID: location.state._id,
            carModel: location.state.model,
            carManufacturer:location.state.manufacturer,
            owner:location.state.ownerID,
            dateSent: Date.now()
        }
        await axios.post("http://localhost:5001/tran", transactionData)
        //await axios.post("https://mern-sesu.herokuapp.com/tran", transactionData)
        history.push("/trans")
    }
    const columns = [
        {
            field: 'email',
            headerName: 'Email',
            flex:5,
            editable: true,
        },
        {
            field: 'user',
            headerName: 'Actions',
            flex:5,
            renderCell: (params) => (
                <>
                            <Button variant="primary" onClick={(e)=>{
                                e.preventDefault()
                                handleSubmit(params.value)}}>
                                Transfer car
                            </Button>
                </>
            )
        },
    ];

    function renderUsers() {
        if (users.length === 0) {
            return (
                <p>Users matching criteria not found</p>
            )
        } else {
            const rows = [];
            for (const user in users) {
                const curr = {
                    id: user,
                    email: users[user].email,
                    user: users[user]
                }
                rows.push(curr);
            }
            return (
                <div style={{height: 600, width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5]}
                        disableColumnSelector
                        disableSelectionOnClick
                        rowHeight={60}
                    />
                </div>
            );
        }
    }
        return (
            <div>
                {renderUsers()}
            </div>
        )
}

export default UserSearchList;