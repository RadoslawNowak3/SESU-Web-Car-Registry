import React, {useContext, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import "./Login.css"
import Button from "react-bootstrap/Button"
import AuthContext from "../../context/AuthContext";
import {Form} from "react-bootstrap";
import styled from "styled-components";
import Alert from "react-bootstrap/Alert";
const StyledForm = styled(Form)`
  width:80%;
  margin-left:10%;
`;
function Login() {

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {getLoggedIn} = useContext(AuthContext);
    const [resError, setResError] = useState([]);
    async function login(e)
    {
        try {
            e.preventDefault();
                const loginData = {
                    email,
                    password
                };
                await axios.post("http://localhost:5001/auth/login", loginData);
                // await axios.post("https://mern-sesu.herokuapp.com/auth/login", loginData);
                await getLoggedIn();
                history.push("/");
            }
        catch (err){
            let errarr=[];
            errarr.push(err);
            setResError(err);
        }
    }
    return (
        <div className="main">
            <p className="sign" align="center">Sign in</p>
            <StyledForm onSubmit={login}>
                <Form.Group className="mb-3" controlid="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Email"
                                  onChange={(e)=>setEmail(e.target.value)}
                                  defaultValue={email}
                    />
            </Form.Group>
            <Form.Group className="mb-3" controlid="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              placeholder="Password"
                              onChange={(e)=>setPassword(e.target.value)}
                              defaultValue={password}
                />
            </Form.Group>
                <div className="text-center">
                    <Button type="submit">Login</Button>
                </div>
                </StyledForm>
            {resError.length > 0 &&
            <Alert variant="danger">
                {resError}
            </Alert>
            }
        </div>
    );


}
export default Login;