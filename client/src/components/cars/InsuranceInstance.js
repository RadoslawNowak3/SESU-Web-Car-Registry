import React from 'react';
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
function InsuranceInstance({singleInsurance})
{
    function makeContainer() {
        let startDate = singleInsurance.startDate.substring(0,10);
        let endDate = singleInsurance.endDate.substring(0,10);
        return (
            <Row>
                <Col xs = {6}>
                    <p><strong>Insurance type: </strong> {singleInsurance.insuranceType}</p>
                    <p><strong>Company: </strong>{singleInsurance.company}</p>
                    <p><strong>Value: </strong>{singleInsurance.value}</p>
                    <p><strong>Start date: </strong> {startDate}</p>
                    <p><strong>End date: </strong> {endDate}</p>
                </Col>
                {singleInsurance.insuranceType==="AC" ?  <Col xs={6}>
                    <p><strong>Additional details</strong></p>
                    {singleInsurance.info}
                </Col> : null}
            </Row>
        )
    }
    return(
        <Container>
            {singleInsurance ? makeContainer() : null}
        </Container>
    )

}
export default InsuranceInstance;