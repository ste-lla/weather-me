import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import TestBrand from "../images/cloud.jpeg"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationSearchInput from "./LocationSearchInput";
//import Form from 'react-bootstrap/Form';
//import Container from 'react-bootstrap/Container'
//import Button from "react-bootstrap/Button";

const SearchNav = () => {

    return (
        <div className="navigationContainer">
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className="mainNav d-flex flex-column pt-3">
                    <Row className="d-flex justify-content-between" style={{width: "100vw"}}>
                        <Col xs={9} sm={4} lg={2} className="navBrandCol">
                            <Navbar.Brand href="#home" className="">
                                <img
                                    alt=""
                                    src={TestBrand}
                                    width="auto"
                                    height="30"
                                    className="d-inline-block align-top brandLogo"
                                />
                                <span className="ms-2 brandName">Weather Star</span>
                            </Navbar.Brand>
                        </Col>

                        <Col xs={12} sm={6} md={4} lg={8} className="navFormCol">
                            <div className="searchInputTagWrapper">
                                <LocationSearchInput />
                            </div>
                            {/* <Form>
                                <Form.Control id="autocomplete" type="text" placeholder="Search City or Zip Code" />
                            </Form> */}
                        </Col>

                        <Col xs={3} sm={2} md={4} lg={2} className="navToggleCol mb-1">
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        </Col>
                    </Row>

                    <Row style={{width: "100vw"}} className="">
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div style={{width: "100vw"}} className="navLinksWrapper">
                                <Nav>
                                    <Nav.Link href="#">Today</Nav.Link>
                                    <Nav.Link href="#">Hourly</Nav.Link>
                                    <Nav.Link href="#">3 Day</Nav.Link>
                                    <Nav.Link href="#">5 Day</Nav.Link>
                                    <Nav.Link href="#">Weekend</Nav.Link> 
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Row>     
            </Navbar>
        </div>
    );
};

export default SearchNav;
