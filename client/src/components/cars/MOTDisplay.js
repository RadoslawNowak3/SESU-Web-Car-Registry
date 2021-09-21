import React from 'react';
import Container from "react-bootstrap/Container"
import MOTInstance from "./MOTInstance";
import Row from "react-bootstrap/Row"
function MOTDisplay({MOT})
{
    MOT[0].sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    });
    const motRows = MOT.map((mot)=>(
        mot.map((instance,id)=>(
            <div>
            <Row key ={id}>
                <MOTInstance singleMOT = {instance}/>
            </Row>
                <br></br>
                </div>
        ))
    ))
    return(
        <Container>
            <p><strong>MOT/Repair Details</strong> </p>
            {motRows}
        </Container>
    )

}
export default MOTDisplay