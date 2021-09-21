import React from 'react';
import Container from "react-bootstrap/Container"
import InsuranceInstance from "./InsuranceInstance";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
function InsuranceDisplay({insurances})
{
    insurances[0].sort(function(a,b){
        return new Date(b.endDate) - new Date(a.endDate);
    });
    const insuranceRows = insurances.map((insurance)=>(
        insurance.map((instance,id)=>(
            <div>
                <Row key ={id}>
                    <Col xs={6}> <strong>Insurance {insurances[0].length-id}</strong></Col>
                    <p></p>
                    <InsuranceInstance singleInsurance = {instance}/>
                </Row>
                <br></br>
            </div>
        ))
    ))
    return(
        <Container>
            {insuranceRows}
        </Container>
    )

}
export default InsuranceDisplay