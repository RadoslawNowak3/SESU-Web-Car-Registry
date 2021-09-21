import React, {useState} from "react";
import {useHistory,useLocation} from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
function CarEdit()
{

    const location = useLocation();;
    const [color, setColor] = useState("");
    const [engineModel, setEngineModel] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [enginePower, setEnginePower] = useState("");
    const [transmission, setTransmission] = useState("");
    const [licensePlates, setLicensePlates] = useState("");
    const [drive, setDrive] = useState("");
    const [fuel, setFuel] = useState("");
    const [fuelUsage, setFuelUsage] = useState("");
    const [steeringWheel, setSteeringWheel] = useState("");
    const [condition, setCondition] = useState("");
    const [onSale, setOnSale] = useState(false);
    const [price, setPrice] = useState("");
    const history = useHistory();
    async function saveCar()
    {
        const updatedCar = {
            color:color,
            engineModel:engineModel,
            engineCapacity:engineCapacity,
            enginePower:enginePower,
            transmission:transmission,
            drive:drive,
            fuel:fuel,
            fuelUsage:fuelUsage,
            steeringWheel:steeringWheel,
            condition:condition,
            onSale:onSale,
            price:price
        }
        console.log(updatedCar)
        await axios({
            url: "http://localhost:5001/car/edit/" + location.state._id,
            method: "PUT",
            data: updatedCar,
        }).then(function(res){
            console.log(res);
        })
        /*await axios({
            url: "https://mern-sesu.herokuapp.com/  car/edit/" + location.state._id,
            method: "PUT",
            data: updatedCar,
        }).then(function(res){
            console.log(res);
        })
        */
        history.push("/car");
    }
return(
    <Container>
        <Form onSubmit={saveCar}>
            <Row className="mb-4">
                <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formCondition">
                        <Form.Label>Car condition </Form.Label>
                        <Form.Control as="select" value={condition} onChange={(e)=>setCondition(e.target.value)}>
                            <option>Select car condition</option>
                            <option value="New">New</option>
                            <option value="Clean">Clean</option>
                            <option value="Average">Average</option>
                            <option value="Rough">Rough</option>
                            <option value="Totalled">Totalled</option>
                            <option value="Lost">Lost/stolen</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formWheel">
                        <Form.Label>Steering wheel placement </Form.Label>
                        <Form.Control as="select" value={steeringWheel} onChange={(e)=>setSteeringWheel(e.target.value)}>
                            <option>Select steering wheel placement</option>
                            <option value="Left">Left</option>
                            <option value="Right">Right</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formTransmission">
                        <Form.Label>Transmission type</Form.Label>
                        <Form.Control as="select" value={transmission} onChange={(e)=>setTransmission(e.target.value)}>
                            <option>Select transmission</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Manual">Manual</option>
                            <option value="Automanual">Automated manual</option>
                            <option value="CVT">CVT</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formDrive">
                        <Form.Label>Drive type</Form.Label>
                        <Form.Control as="select" value={drive} onChange={(e)=>setDrive(e.target.value)}>
                            <option>Select drive type</option>
                            <option value="AWD">AWD</option>
                            <option value="RWD">RWD</option>
                            <option value="FWD">FWD</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formFuel">
                        <Form.Label>Fuel type</Form.Label>
                        <Form.Control as="select" value={fuel} onChange={(e)=>setFuel(e.target.value)}>
                            <option>Select fuel type</option>
                            <option value="Gas">Gas</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formengineMControl">
                        <Form.Label>Engine model</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Engine model"
                                      onChange={(e)=>setEngineModel(e.target.value)}
                                      defaultValue={engineModel}
                        />
                    </Form.Group>
                </Col>

                <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formengineCControl">
                        <Form.Label>Engine capacity</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Engine capacity"
                                      onChange={(e)=>setEngineCapacity(e.target.value)}
                                      defaultValue={engineCapacity}
                        />
                    </Form.Group>
                </Col>

                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formFuelUsage">
                        <Form.Label>Fuel usage</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Fuel usage"
                                      onChange={(e)=>setFuelUsage(e.target.value)}
                                      defaultValue={fuelUsage}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formenginePControl">
                        <Form.Label>Engine power</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Engine power"
                                      onChange={(e)=>setEnginePower(e.target.value)}
                                      defaultValue={enginePower}
                        />
                    </Form.Group>
                </Col>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formLicense">
                        <Form.Label>License plates</Form.Label>
                        <Form.Control type="text"
                                      placeholder="License plates"
                                      onChange={(e)=>setLicensePlates(e.target.value)}
                                      defaultValue={licensePlates}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <Form.Group className="mb-3" controlid="colorModel">
                        <Form.Label>Car color </Form.Label>
                        <Form.Control as="select" value={color} onChange={(e)=>setColor(e.target.value)}>
                            <option>Select car color</option>
                            <option value="White">White</option>
                            <option value="Black">Black</option>
                            <option value="Gray">Gray</option>
                            <option value="Silver">Silver</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Brown">Brown</option>
                            <option value="Green">Green</option>
                            <option value="Beige">Beige</option>
                            <option value="Orange">Orange</option>
                            <option value="Gold">Gold</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Purple">Purple</option>
                            <option value="Pink">Pink</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formSale">
                        <Form.Label>Car sale status</Form.Label>
                        <Form.Control as="select"onChange={(e)=>
                        {   if(e.target.value==="true")
                            setOnSale(true);
                            else
                                setOnSale(false);
                        }}>
                            <option>Set sale status</option>
                            <option value="true">On sale</option>
                            <option value="false">Not on sale</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                {onSale ?
                <Col xs={2}>
                    <Form.Group className="mb-3" controlid="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number"
                                      placeholder="Set price"
                                      onChange={(e)=>setPrice(e.target.value)}
                                      defaultValue={price}
                        />
                    </Form.Group>
                </Col> : null
                }
            </Row>
            <p>Leave the fields you want to remain unchanged empty</p>
            <Button type="submit">Submit</Button>
        </Form>
    </Container>
)}

export default CarEdit;