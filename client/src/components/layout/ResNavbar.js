import React, {useContext} from 'react';
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import Container from "react-bootstrap/Container"
import AuthContext from "../../context/AuthContext";
import LogOutButton from "./LogOutButton";
function ResNavbar() {
    const {loggedIn} = useContext(AuthContext)
    if(loggedIn)
    return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">SESU</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/car/search">Cars on sale</Nav.Link>
                    <Nav.Link href="/trans">Car transactions</Nav.Link>
                    <NavDropdown title="Your cars" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/car"> Manage your cars </NavDropdown.Item>
                        <NavDropdown.Item href="/car/add">Add a new car</NavDropdown.Item>
                    </NavDropdown>

                </Nav>
                <Nav.Link href="/userpanel">User panel</Nav.Link>
                <LogOutButton/>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
    else return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">SESU</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default ResNavbar;