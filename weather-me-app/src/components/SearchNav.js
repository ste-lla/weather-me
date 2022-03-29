import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import TestBrand from "../images/cloud.jpeg"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocationSearchInput from "./LocationSearchInput";


const SearchNav = () => {
    //setLat and setLon are passed as props tp <LocationSearchInput />
    const[lat, setLat] = useState(Number(localStorage.getItem('lat')));
    const[lon, setLon] = useState(Number(localStorage.getItem('lon')));
    
    /* let test = () => {
        console.log(lat);
        console.log(lon);
    } */
    
    return {
        lat, lon,
        render:(
        <div className="navigationContainer">
            <header className="header">
                <Navbar collapseOnSelect expand="md" /* bg="dark" variant="dark" */ className="mainNav d-flex flex-column pt-3">
                        <Row className="d-flex justify-content-between" style={{width: "100vw"}}>
                            <Col xs={9} sm={4} lg={2} className="navBrandCol">
                                <Navbar.Brand href="#" className="">
                                    <img
                                        alt=""
                                        src={TestBrand}
                                        width="auto"
                                        height="30"
                                        className="d-inline-block align-top brandLogo"
                                        /* onClick={test} */
                                    />
                                    <span className="ms-2 brandName">Weather Star</span>
                                </Navbar.Brand>
                            </Col>

                            <Col xs={12} sm={6} md={4} lg={8} className="navFormCol">
                                <div className="searchInputTagWrapper">
                                    <LocationSearchInput setLatitude={setLat} setLongitude={setLon}  />
                                </div>
                                {/* <Form>
                                    <Form.Control id="autocomplete" type="text" placeholder="Search City or Zip Code" />
                                </Form> */}
                            </Col>

                            <Col xs={3} sm={2} md={4} lg={2} className="navToggleCol mb-1">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            </Col>
                        </Row>

                        <Row style={{width: "100vw"}} className="mt-3">
                            <Navbar.Collapse id="basic-navbar-nav">
                                <div style={{width: "100vw"}}>
                                    <Nav className="navLinksWrapper">
                                        <Nav.Link href="/weather/today" className="navLinks">Today</Nav.Link>
                                        <Nav.Link href="/weather/hourly" className="navLinks">Hourly</Nav.Link>
                                        <Nav.Link href="/weather/fiveday" className="navLinks">5 Day</Nav.Link>
                                        <Nav.Link href="/weather/tenday" className="navLinks">10 Day</Nav.Link>
                                        <Nav.Link href="/weather/weekend" className="navLinks">Weekend</Nav.Link> 
                                    </Nav>
                                </div>
                            </Navbar.Collapse>
                        </Row>     
                </Navbar>
            </header>
        </div>
    ),};
};

export default SearchNav;
