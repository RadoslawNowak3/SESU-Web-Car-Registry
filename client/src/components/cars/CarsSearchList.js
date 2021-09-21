import React from "react";
import { DataGrid } from '@material-ui/data-grid';
import RedirectButton from '../layout/RedirectButton'
const columns = [
    {
        field: 'manufacturer',
        headerName: 'Manufacturer',
        flex:5,
    },
    {
        field: 'model',
        headerName: 'Model',
        flex:5,
    },
    {
        field: 'transmission',
        headerName: 'Transmission',
        flex:5,
    },
    {
        field: 'fuelType',
        headerName: 'Fuel Type',
        flex:5,
    },
    {
        field: 'prodYear',
        headerName: 'Production year',
        type: 'number',
        flex:4,
    },
   {
        field: 'price',
        headerName: 'Price',
        flex:4,
    },

    {
        field: 'car',
        headerName: 'Actions',
        flex:4,
        renderCell: (params) => (
            <RedirectButton route = {"/car/"} text = "Car info" value = {params.value._id} info ={params.value}>  </RedirectButton>
        )
    },
];

function CarsSearchList({cars})
{
    function renderCars()
    {
        if(cars.length===0)
        {
            return (
                <p>Cars matching criteria not found</p>
            )
        }
        else {
            const rows =[];
            for(const car in cars)
            {
                if(cars[car].onSale) {
                    const curr = {
                        id: car,
                        manufacturer: cars[car].manufacturer,
                        model: cars[car].model,
                        transmission: cars[car].transmission,
                        fuelType: cars[car].fuel,
                        prodYear: cars[car].productionYear,
                        price: cars[car].price,
                        car: cars[car]
                    }
                    rows.push(curr);
                }
            }
            return (
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </div>
            );
        }
    }
    return(
        <div>
                {renderCars()}
        </div>
    )
}

export default CarsSearchList;