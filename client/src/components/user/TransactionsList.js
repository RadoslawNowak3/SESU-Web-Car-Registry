import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import Button from 'react-bootstrap/Button'
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {useHistory} from "react-router-dom"
function TransactionsList(props) {
    const history = useHistory();
    async function handleAccept(props)
    {
    const updatedCar={
        newOwner: props.newOwner,
        oldOwner: props.oldOwner,
        carID: props.carID
    }
    const updatedTransaction = {finished:true}
   /* await axios({
                url: "http://localhost:5001/car/transfer/",
                method: "PUT",
                data: updatedCar})
    await axios({
                url: "http://localhost:5001/tran/" + props._id,
                method: "PUT",
                data: updatedTransaction})
    */
        await axios({
        url: "https://mern-sesu.herokuapp.com/car/transfer/",
        method: "PUT",
        data: updatedCar})
        await axios({
            url: "https://mern-sesu.herokuapp.com/tran/" + props._id,
            method: "PUT",
            data: updatedTransaction})
        history.push("/car")
    }
    async function handleReject(props)
    {
        const updatedTransaction = {
            finished:true,
        }
        await axios({
            url: "http://localhost:5001/tran/" + props._id,
            method: "PUT",
            data: updatedTransaction,
        })
        history.push("/car")
    }
    const columns = [
        {
            field:'manufacturer',
            headerName: 'Manufacturer',
            flex:3,
            editable:false
        },

        {
            field:'model',
            headerName: 'Model',
            flex:3,
            editable:false
        },
        {
            field:'date',
            headerName: 'Date sent',
            flex:3,
            editable:false
        },
        {
            field: 'tran',
            headerName: 'Transaction',
            flex:3,
            minWidth: 200,
            editable:false,
            disableColumnFilter:true,
            disableColumnMenu:true,
            renderCell: (params) => (
                <div>
                    {props.type === "Received" ?
                        <ButtonGroup>
                            <Form>
                                <Button variant="primary" onClick={(e)=>{
                                    e.preventDefault()
                                    handleAccept(params.value)}}>
                                    Accept
                                </Button>
                            </Form>
                            <Form>
                                <Button variant="primary" onClick={(e)=>{
                                    e.preventDefault()
                                    handleReject(params.value)}}>
                                    Reject
                                </Button>
                            </Form>
                        </ButtonGroup>:
                        <Form>
                            <Button variant="primary" onClick={(e)=>{
                                e.preventDefault()
                                handleReject(params.value)}}>
                                Cancel transaction
                            </Button>
                        </Form>
                    }
                </div>
            ),
        },
    ];
    function renderTrans()
    {
            const rows =[];
            for(const tran in props.trans)
            {
                    let transactiondate = props.trans[tran].dateSent.substring(0, 10);
                    if(!props.trans[tran].finished) {
                        const curr = {
                            id: tran,
                            manufacturer: props.trans[tran].carManufacturer,
                            model: props.trans[tran].carModel,
                            date: transactiondate,
                            tran: props.trans[tran]
                        }
                        rows.push(curr);
                    }
            }
            return (
                <div style={{ height: 600, width: '100%' }}>
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
    return(
        <div>
            <ul>
                {renderTrans()}
            </ul>
        </div>
    )
}

export default TransactionsList;