import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import RedirectButton from "../layout/RedirectButton";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
const columns = [
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        flex:2,
        editable: true,
    },
    {
        field: 'model',
        headerName: 'Model',
        flex:2,
        editable: true,
    },
    {
        field: 'bodywork',
        headerName: 'Bodywork',
        flex:2,
        editable: true,
    },
    {
        field: 'engineModel',
        headerName: 'Engine model',
        flex:2,
        editable: true,
    },
    {
    field: 'transmission',
    headerName: 'Transmission',
        flex:2,
    editable: true,
},
    {
        field: 'fuelType',
        headerName: 'Fuel type',
        flex:2,
        editable: true,
    },
    {
        field: 'prodYear',
        headerName: 'Production year',
        type: 'number',
        flex:2,
        editable: true,
    },

    {
        field: 'car',
        headerName: 'Actions',
        flex:3,
        minWidth: 200,
        editable:false,
        disableColumnFilter:true,
        disableColumnMenu:true,
        renderCell: (params) => (
            <div>
            <ButtonGroup vertical>
                <RedirectButton route = {"/car/"} value = {params.value._id} info ={params.value} text = "Car details" > </RedirectButton>
                <RedirectButton route = {"/oc/"} value = {params.value._id} info = {params.value._id} text = "Add insurance"> </RedirectButton>
            </ButtonGroup>
            <ButtonGroup vertical>
                <RedirectButton route = {"/car/edit/"} value = {params.value._id} info ={params.value} text = "Edit car info" > </RedirectButton>
                <RedirectButton route = {"/car/mot/"} value = {params.value._id} info ={params.value._id} text = "Add car MOT" > </RedirectButton>
            </ButtonGroup>
            </div>
        ),
    },
    {
        field: 'car2',
        headerName: 'Transfer',
        flex:2,
        editable:false,
        disableColumnFilter:true,
        disableColumnMenu:true,
        renderCell: (params) => (
            <div>
                    <RedirectButton route = {"/usersearch/"} value = {params.value} text = "Transfer car ownership"> </RedirectButton>
            </div>
        ),
    },
];

function CarsList({cars})
{
    function renderCars()
    {
        if(cars.length===0)
        {
            return (
                <p>Cars matching criteria not found</p>
            )
        }
        else
        {
             const rows =[];
            for(const car in cars)
            {
                const curr ={
                    id: car,
                    manufacturer:cars[car].manufacturer,
                    model:cars[car].model,
                    bodywork:cars[car].bodywork,
                    prodYear:cars[car].productionYear,
                    engineModel:cars[car].engineModel,
                    transmission:cars[car].transmission,
                    fuelType:cars[car].fuel,
                    car:cars[car],
                    car2:cars[car]
                }
                rows.push(curr);
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
    }
    return(
    <div>
        <ul>
            {renderCars()}
        </ul>
    </div>
    )
}

export default CarsList;