import React, {useState} from 'react';
import {useHistory,useLocation} from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";


function AddInsurance() {
    const history = useHistory();
    const [type, setType]=useState("");
    const [info, setInfo]=useState("")
    const [company, setCompany] = useState("");
    const [value, setValue] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState([]);
    const location = useLocation();
    async function saveInsurance(e) {
        try {
            e.preventDefault();
            const errarr = [];
            if(company.length<3 || !company.match("^[A-Za-z0-9/s]+$")){
                errarr.push("company");
            }
            if(value.length<3 || !value.match("^[0-9]+$")){
                errarr.push("value")
            }
            if(type.length<1 || !type.match("^[A-Za-z]+$")){
                errarr.push("type")
            }
            if(errarr.length===0) {
                errarr.length=0;
                setErrors(errarr);
                const insuranceData = {
                    type,
                    company,
                    value,
                    info,
                    startDate,
                    endDate
                };
                 axios.put("http://localhost:5001/car/insurance/" + location.state, insuranceData)
                //axios.put("https://mern-sesu.herokuapp.com/car/insurance/" + location.state, insuranceData)
                history.push("/car");
            }
            else {
                setErrors(errarr);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
            <Container>
                <Form onSubmit={saveInsurance}>
                    <Row>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlid="formCompany">
                            <Form.Label><strong>Insurance company</strong></Form.Label>
                            <Form.Control type="text"
                                          placeholder="Insurance company"
                                          onChange={(e)=>setCompany(e.target.value)}
                                          defaultValue={company}
                            />
                            {errors.includes("company") &&
                            <Alert variant="danger">
                               Invalid insurance company name
                            </Alert>
                            }
                        </Form.Group>
                    </Col>
                        <Col xs={2}>
                            <Form.Group className="mb-3" controlid="formValue">
                                <Form.Label><strong>Insurance value</strong></Form.Label>
                                <Form.Control type="number"
                                              placeholder="Insurance value"
                                              onChange={(e)=>setValue(e.target.value)}
                                              defaultValue={value}
                                />
                                {errors.includes("value") &&
                                <Alert variant="danger">
                                    Invalid insurance value
                                </Alert>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Form.Group className="mb-3" controlid="formType">
                                <Form.Label><strong>Insurance type</strong></Form.Label>
                                <Form.Control as="select" value={type} onChange={(e)=>setType(e.target.value)}>
                                    <option>Insurance type</option>
                                    <option value="OC">OC</option>
                                    <option value="AC">AC</option>
                                </Form.Control>
                                {errors.includes("type") &&
                                <Alert variant="danger">
                                    Invalid insurance type
                                </Alert>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                {type=="AC" &&
                <Form.Group className="mb-3" controlid="formDetails">
                <Form.Label controlId="floatingTextarea2" label="Insurance details">
                    <Form.Control
                        as="textarea"
                        placeholder="Share insurance details"
                        value={info} onChange={(e)=>setInfo(e.target.value)}
                        style={{ height: '100px', width:"420px" }}
                    />
                </Form.Label>
                </Form.Group>
                }
                    <p> <strong>Insurance start date</strong></p>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <p> <strong>Insurance end date</strong></p>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                  <p></p>
                <Button type="submit">Add insurance</Button>
            </Form>
            </Container>
    )
}
export default AddInsurance;