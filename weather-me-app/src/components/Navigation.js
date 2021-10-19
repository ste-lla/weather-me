import { Navbar, Nav, Container } from 'react-bootstrap';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

const Navigation = () => {
    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <IndexLinkContainer to="/">
                    <Navbar.Brand>Weather-Me</Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/3-day-forecast">
                            <Nav.Link>3 Day Forecast</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/5-day-forecast">
                            <Nav.Link>5 Day Forecast</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;