import React, {useState} from 'react';
import Container from "react-bootstrap/Container"
import MOTDisplay from "./MOTDisplay";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InsuranceDisplay from "./InsuranceDisplay";
function CarDetails (props)
{
    const [visible, setVisible] = useState(false);
    const [visibleInsurance, setVisibleInsurance] = useState(false);
    function showDetails() {
        const car=props.car
        const owner = props.owner;
        const carprops = ["Manufacturer", "Model", "Bodywork", "Color", "Production Year", "Country of origin",
            "Engine model", "Engine capacity", "Engine power", "Transmission", "Drive", "Fuel type", "Fuel usage",
            "Steering wheel placement", "Condition", "Previous owners"]
        let cartable = [car.manufacturer, car.model, car.bodywork, car.color, car.productionYear, car.countryOfOrigin,
            car.engineModel, car.engineCapacity, car.enginePower, car.transmission, car.drive, car.fuel,
            car.fuelUsage, car.steeringWheel, car.condition, car.ownerCount]
        if(!owner)
        {
            carprops.push("License Plates")
            cartable.push(car.licensePlates)
            carprops.push("VIN")
            cartable.push(car.VIN)
        }
        const objectArr = carprops.map((prop,index)=>
            <div key = {index}>
                <strong>{prop}</strong>
            </div>
        );
        const objectArr2 = cartable.map((prop, idx) => (
                <div key={idx}>
                    {prop}
                </div>
            )
        );
        return (
            <Container>
                <header>
                    <strong>Car info</strong>
                </header>
                <div className="grid-container2">
                    <ul>{objectArr} </ul>
                    <ul>{objectArr2}</ul>
                </div>
            </Container>
        )
    }
    function showMOT()
    {
        const mot = props.car.MOT;
        return(
        <Container>
            <Button onClick={()=>
                setVisible(!visible)
            }> View car MOT </Button>
            {(visible &&  mot.length>0) &&
                <MOTDisplay MOT={[mot]}/> }
            {(visible && !(mot.length>0))&&<p> No MOT records to display.</p>}
        </Container>
      )
    }
    function secondaryDetails()
    {
        const owner = props.owner
        if(owner)
        {
            return (
            <Container>
                <p><strong>Owner information</strong></p>
                <p><strong>Email:</strong> {owner.email} </p>
                <p><strong>Phone number:</strong> {owner.phoneNumber? owner.phoneNumber : ("Not specified")}</p>
                <p><strong>Country of residence:</strong> {owner.countryOfResidence}</p>
            </Container>
            )
        }
    }
    function showInsurances()
    {
        const insurances = props.car.insurances;
        return(
            <Container>
                <Button onClick={()=>
                    setVisibleInsurance(!visibleInsurance)
                }> View car insurances </Button>
                {(visibleInsurance &&  insurances.length>0) &&
                <InsuranceDisplay insurances={[insurances]}/> }
                {(visibleInsurance && !(insurances.length>0))&&<p> No insurance records to display.</p>}
            </Container>
        )
    }
  /*function secondaryDetails()
    {
        const car=props.car
        const owner = props.owner
        const insurancetable=[];
        const insuranceprops =["Type","Company","Value","Start date","End date"];
        for(let insurance in car.insurances) {
            if(insurance.endDate>Date.now()) {
                let arr = [
                    car.insurances[insurance].insuranceType,
                    car.insurances[insurance].company,
                    car.insurances[insurance].value,
                    car.insurances[insurance].startDate,
                    car.insurances[insurance].endDate,
                    car.insurances[insurance].info]
                insurancetable.push(car.insurances)
            }
        }
        const objectArr = insuranceprops.map((prop,index)=>
            <div key = {index}>
                <strong>{prop}</strong>
            </div>
        );
        const arrofArrs = [];
        for(let insurance in insurancetable) {
            let objectArr2 = insurance.map((prop, idx) => (
                    <div key={idx}>
                        {prop}
                    </div>
                ));
                arrofArrs.push(objectArr2);
        }
        if(owner)
            return(
                <Container>
                    Test
                </Container>
            )
        return(
           <Container>

           </Container>
        )
    }
   */
    return (
        <Container>
            <Row>
            <Col>
                {showDetails()}
            </Col>
            <Col>
                {secondaryDetails()}
            </Col>
            </Row>
            <Row>
                {showMOT()}
            </Row>
            <p></p>
            <Row>
                {showInsurances()}
            </Row>
        </Container>
    )
}
export default CarDetails;