import React, {useState} from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
function CarsForm(){

    const [errors, setErrors] = useState([]);
    const [response, setResponse] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [mileage, setMileage] = useState("");
    const [bodywork, setBodywork] = useState("");
    const [color, setColor] = useState("");
    const [productionYear, setProductionYear] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [engineModel, setEngineModel] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [enginePower, setEnginePower] = useState("");
    const [transmission, setTransmission] = useState("");
    const [drive, setDrive] = useState("");
    const [fuel, setFuel] = useState("");
    const [fuelUsage, setFuelUsage] = useState("");
    const [steeringWheel, setSteeringWheel] = useState("");
    const [condition, setCondition] = useState("");
    const [licensePlates,setLicensePlates] = useState("");
    const [vin,setVin] = useState("");
    const [owners,setOwners] = useState("");
    async function saveCar(e){
        e.preventDefault();
        try{
            const errarr = []
            if(manufacturer.length < 1 || !manufacturer.match(/^[A-Za-z0-9\s]+$/) )
            {
                errarr.push("manufacturer");
            }
            if(steeringWheel.length < 1  || !steeringWheel.match(/^[A-Za-z]+$/) )
            {
                errarr.push("wheel");
            }
            if(condition.length < 1 || !condition.match(/^[A-Za-z]+$/) )
            {
                errarr.push("condition");
            }
            if(model.length < 1 || !model.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("model");
            }
            if(bodywork.length < 3 || !bodywork.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("bodywork");
            }
            if(productionYear>new Date().getFullYear() || productionYear<1886)
            {
                errarr.push("year");
            }
            if(countryOfOrigin.length < 3|| !countryOfOrigin.match(/^[A-Za-z\s]+$/))
            {
                errarr.push("country");
            }
            if(engineModel.length < 2 || !engineModel.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("engineModel");
            }
            if(engineCapacity.length < 2)
            {
                errarr.push("engineCapacity");
            }
            if(enginePower.length < 2)
            {
                errarr.push("enginePower");
            }
            if(transmission.length < 2 || !transmission.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("transmission");
            }
            if(drive.length < 2 || !drive.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("drive");
            }
            if(fuel.length < 2 || !fuel.match(/^[A-Za-z]+$/))
            {
                errarr.push("fuel");
            }
            if(fuelUsage.length < 1 || !fuelUsage.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("fuelUsage");
            }
            if(licensePlates.length < 6|| !licensePlates.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("licensePlates");
            }
            if(vin.length < 11 || vin.length>17 || !vin.match(/^[A-Za-z0-9]+$/))
            {
                errarr.push("VIN");
            }
            if(owners.length<0 || !owners.match(/^[0-9]+$/))
            {
                errarr.push("owners");
            }
            if(mileage.length<0 || !mileage.match(/^[0-9]+$/))
            {
                errarr.push("mileage");
            }
            if(color.length<0 || !color.match(/^[A-Za-z]+$/))
            {
                errarr.push("color");
            }
            setErrors(errarr)
            if(errarr.length<1){
                const carData = {
                    manufacturer: manufacturer,
                    model: model,
                    bodywork: bodywork,
                    mileage:mileage,
                    color: color,
                    productionYear: productionYear,
                    countryOfOrigin: countryOfOrigin,
                    engineModel: engineModel,
                    engineCapacity: engineCapacity,
                    enginePower: enginePower,
                    transmission: transmission,
                    drive: drive,
                    fuel: fuel,
                    fuelUsage: fuelUsage,
                    steeringWheel: steeringWheel,
                    condition: condition,
                    licensePlates:licensePlates,
                    VIN:vin,
                    ownerCount: owners
                };
                 await axios.post("http://localhost:5001/car", carData)
                 //await axios.post("https://mern-sesu.herokuapp.com/car", carData)
                setResponse("200");
            }
        } catch(err){
            console.log(err.message)
            if(err.message.includes(409))
                setResponse("409");
            else
                setResponse("500");
        }
    }
    return(
        <Container>
            <Form onSubmit={saveCar}>
                <Row>
                    <Col xs={3}>
                <Form.Group md="4" controlid="formManufacturer">
                    <Form.Label>Car manufacturer</Form.Label>
                <Form.Control as="select" value={manufacturer} onChange={(e)=>setManufacturer(e.target.value)}>
                    <option>Select car manufacturer</option>
                    <option value="Abarth">Abarth</option>
                    <option value="Alfa Romeo">Alfa Romeo</option>
                    <option value="Aston Martin">Aston Martin</option>
                    <option value="Audi">Audi</option>
                    <option value="Bentley">Bentley</option>
                    <option value="Bmw">BMW</option>
                    <option value="Bugatti">Bugatti</option>
                    <option value="Cadillac">Cadillac</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Chrysler">Chrysler</option>
                    <option value="Citroen">Citroen</option>
                    <option value="Dacia">Dacia</option>
                    <option value="Daewoo">Daewoo</option>
                    <option value="Daihatsu">Daihatsu</option>
                    <option value="Dodge">Dodge</option>
                    <option value="Donkervoort">Donkervoort</option>
                    <option value="DS">DS</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Fiat">Fiat</option>
                    <option value="Fisker">Fisker</option>
                    <option value="Ford">Ford</option>
                    <option value="Honda">Honda</option>
                    <option value="Hummer">Hummer</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Infiniti">Infiniti</option>
                    <option value="Iveco">Iveco</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Jeep">Jeep</option>
                    <option value="Kia">Kia</option>
                    <option value="Ktm">KTM</option>
                    <option value="Lada">Lada</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Lancia">Lancia</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Landwind">Landwind</option>
                    <option value="Lexus">Lexus</option>
                    <option value="Lotus">Lotus</option>
                    <option value="Maserati">Maserati</option>
                    <option value="Maybach">Maybach</option>
                    <option value="Mazda">Mazda</option>
                    <option value="McLaren">McLaren</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Mg">MG</option>
                    <option value="Mini">Mini</option>
                    <option value="Mitsubishi">Mitsubishi</option>
                    <option value="Morgan">Morgan</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Opel">Opel</option>
                    <option value="Peugeot">Peugeot</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Renault">Renault</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Rover">Rover</option>
                    <option value="Saab">Saab</option>
                    <option value="Seat">Seat</option>
                    <option value="Skoda">Skoda</option>
                    <option value="Smart">Smart</option>
                    <option value="SsangYong">SsangYong</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Suzuki">Suzuki</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Volvo">Volvo</option>
                </Form.Control>
                    {errors.includes("manufacturer") &&
                    <Alert variant="danger">
                        Invalid car manufacturer
                    </Alert>
                    }
                </Form.Group>
                    </Col>
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
                            {errors.includes("condition") &&
                            <Alert variant="danger">
                                Invalid condition
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                <Form.Group className="mb-3" controlid="formBodywork">
                    <Form.Label>Car bodywork</Form.Label>
                    <Form.Control as="select" value={bodywork} onChange={(e)=>setBodywork(e.target.value)}>
                        <option>Select bodywork type</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Sport">Sports car</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Suv">SUV</option>
                        <option value="Van">Van</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Truck">Truck</option>
                        <option value="Semi-truck">Semi-truck</option>
                    </Form.Control>
                    {errors.includes("bodywork") &&
                    <Alert variant="danger">
                        Invalid bodywork
                    </Alert>
                    }
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
                            {errors.includes("wheel") &&
                            <Alert variant="danger">
                                Invalid steering wheel placement
                            </Alert>
                            }
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formCountry">
                            <Form.Label>Country of origin</Form.Label>
                            <Form.Control as="select" value={countryOfOrigin} onChange={(e)=>setCountryOfOrigin(e.target.value)}>
                                <option>Select country of origin</option>
                                <option value="Afganistan">Afghanistan</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samoa">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Bonaire">Bonaire</option>
                                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Canary Islands">Canary Islands</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Channel Islands">Channel Islands</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos Island">Cocos Island</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo">Congo</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Cote DIvoire">Cote DIvoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curaco">Curacao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czech Republic">Czech Republic</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="East Timor">East Timor</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands">Falkland Islands</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Ter">French Southern Ter</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Great Britain">Great Britain</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="India">India</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="Korea North">Korea North</option>
                                <option value="Korea Sout">Korea South</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macau">Macau</option>
                                <option value="Macedonia">Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Midway Islands">Midway Islands</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option>
                                <option value="Nambia">Nambia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherland Antilles">Netherland Antilles</option>
                                <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                <option value="Nevis">Nevis</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau Island">Palau Island</option>
                                <option value="Palestine">Palestine</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Phillipines">Philippines</option>
                                <option value="Pitcairn Island">Pitcairn Island</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Republic of Montenegro">Republic of Montenegro</option>
                                <option value="Republic of Serbia">Republic of Serbia</option>
                                <option value="Reunion">Reunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="St Barthelemy">St Barthelemy</option>
                                <option value="St Eustatius">St Eustatius</option>
                                <option value="St Helena">St Helena</option>
                                <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                <option value="St Lucia">St Lucia</option>
                                <option value="St Maarten">St Maarten</option>
                                <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                <option value="Saipan">Saipan</option>
                                <option value="Samoa">Samoa</option>
                                <option value="Samoa American">Samoa American</option>
                                <option value="San Marino">San Marino</option>
                                <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Swaziland">Swaziland</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Tahiti">Tahiti</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Erimates">United Arab Emirates</option>
                                <option value="United States of America">United States of America</option>
                                <option value="Uraguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Vatican City State">Vatican City State</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                <option value="Wake Island">Wake Island</option>
                                <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zaire">Zaire</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                            </Form.Control>
                            {errors.includes("country") &&
                            <Alert variant="danger">
                                Invalid country of origin
                            </Alert>
                            }
                        </Form.Group>
                    </Col>


                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formTransmission">
                            <Form.Label>Transmission type</Form.Label>
                            <Form.Control as="select" value={transmission} onChange={(e)=>setTransmission(e.target.value)}>
                                <option>Select transmission</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>
                                <option value="Automanual">Automated manual</option>
                                <option value="CVT">CVT</option>
                            </Form.Control>
                            {errors.includes("manufacturer") &&
                            <Alert variant="danger">
                                Invalid transmission
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formDrive">
                        <Form.Label>Drive type</Form.Label>
                        <Form.Control as="select" value={drive} onChange={(e)=>setDrive(e.target.value)}>
                        <option>Select drive type</option>
                            <option value="AWD">AWD</option>
                            <option value="RWD">RWD</option>
                            <option value="FWD">FWD</option>
                    </Form.Control>
                        {errors.includes("drive") &&
                        <Alert variant="danger">
                            Invalid drive type
                        </Alert>
                        }
                </Form.Group>
                    </Col>

                    <Col xs={3}>
                    <Form.Group className="mb-3" controlid="formFuel">
                        <Form.Label>Fuel type</Form.Label>
                        <Form.Control as="select" value={fuel} onChange={(e)=>setFuel(e.target.value)}>
                            <option>Select fuel type</option>
                            <option value="Gas">Gas</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electric">Electric</option>
                            <option value="Hybrid">Hybrid</option>
                        </Form.Control>
                        {errors.includes("fuel") &&
                        <Alert variant="danger">
                            Invalid fuel type
                        </Alert>
                        }
                    </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlid="formengineCControl">
                            <Form.Label>Engine capacity</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Engine capacity"
                                          onChange={(e)=>setEngineCapacity(e.target.value)}
                                          defaultValue={engineCapacity}

                            />
                            {errors.includes("engineCapacity") &&
                            <Alert variant="danger">
                                Invalid engine capacity
                            </Alert>
                            }
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
                            {errors.includes("enginePower") &&
                            <Alert variant="danger">
                                Invalid engine power
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlid="formFuelUsage">
                            <Form.Label>Fuel usage</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Fuel Usage"
                                          onChange={(e)=>setFuelUsage(e.target.value)}
                                          defaultValue={fuelUsage}
                            />
                            {errors.includes("fuelUsage") &&
                            <Alert variant="danger">
                                Invalid fuel usage
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formengineMControl">
                            <Form.Label>Engine model</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Engine model"
                                          onChange={(e)=>setEngineModel(e.target.value)}
                                          defaultValue={engineModel}
                            />
                            {errors.includes("engineModel") &&
                            <Alert variant="danger">
                                Invalid engine model
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formModel">
                            <Form.Label>Car model</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Car Model"
                                          onChange={(e)=>setModel(e.target.value)}
                                          defaultValue={model}
                            />
                            {errors.includes("model") &&
                            <Alert variant="danger">
                                Invalid car model
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlid="formMileage">
                            <Form.Label>Mileage</Form.Label>
                            <Form.Control type="number"
                                          placeholder="Mileage"
                                          onChange={(e)=>setMileage(e.target.value)}
                                          defaultValue={mileage}
                            />
                            {errors.includes("mileage") &&
                            <Alert variant="danger">
                                Invalid mileage
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlid="formYear">
                            <Form.Label>Production year</Form.Label>
                            <Form.Control type="number"
                                          placeholder="Production Year"
                                          onChange={(e)=>setProductionYear(e.target.value)}
                                          defaultValue={productionYear}
                            />
                            {errors.includes("year") &&
                        <Alert variant="danger">
                            Invalid production year
                        </Alert>
                        }
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
                            {errors.includes("licensePlates") &&
                            <Alert variant="danger">
                                Invalid license plates
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formOwners">
                            <Form.Label>Previous owners</Form.Label>
                            <Form.Control type="number"
                                          placeholder="Number of previous owners"
                                          onChange={(e)=>setOwners(e.target.value)}
                                          defaultValue={owners}
                            />
                            {errors.includes("owners") &&
                            <Alert variant="danger">
                                Invalid number of previous owners
                            </Alert>
                            }
                        </Form.Group>
                    </Col>

                    <Col xs={3}>
                        <Form.Group className="mb-3" controlid="formVIN">
                            <Form.Label>Vehicle Identification Number</Form.Label>
                            <Form.Control type="text"
                                          placeholder="VIN"
                                          onChange={(e)=>setVin(e.target.value)}
                                          defaultValue={vin}
                            />
                            {errors.includes("VIN") &&
                            <Alert variant="danger">
                                Invalid VIN
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
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
                            {errors.includes("color")&&
                            <Alert variant="danger">
                                Invalid color
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                </Row>
                    <Button type="submit">Submit</Button>
                </Form>
                {response==="200" &&
                <Alert variant="success">
                    <p> Success! </p>
                </Alert>
                }
                {response==="409" &&
                <Alert variant ="warning">
                    <p> Car already exists in database </p>
                </Alert>
                }
                {response==="500" &&
               <Alert variant ="danger">
                    <p> Failed to save data! </p>
               </Alert>
                }
            </Container>
    )
}
export default CarsForm;