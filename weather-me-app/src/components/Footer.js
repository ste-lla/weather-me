import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from 'react-router-dom';
import { FaFacebookF } from "react-icons/fa"
import { ImInstagram } from "react-icons/im";
import { BsTwitter } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

const Footer = () => {
  return(
    <footer className="footerContainer">
      <Row className="footer">
        <Col xs={6} sm={3} md={2} lg={3} xl={4}>
          <div className="footerLeft">
            <div><Link to="#" className="footerLinks">About Us</Link></div>
            <div><Link to="#" className="footerLinks">Contact</Link></div>
            <div><Link to="#" className="footerLinks">Careers</Link></div>
          </div>
        </Col>

        <Col xs={6} sm={4} md={7} lg={6} xl={4} className="footerCtrCol">
          <div className="footerCenter">
            <div><Link to="#" className="footerLinks">Feedback</Link></div>
            <div><Link to="#" className="footerLinks">Terms of Use</Link></div>
            <div><Link to="#" className="footerLinks">Privacy Policy</Link></div>
          </div>
        </Col>

        <Col xs={12} sm={5} md={3} lg={3} xl={4}>
          <div className="footerRight">
            <div className="connectWithUs">Connect With Us</div>
            <div className="mt-3 socMedIconContainer">
              <span className="me-3"><Link to="#" className="socMediaLinks"><FaFacebookF className="socMediaIcons"/></Link></span>
              <span className="me-3"><Link to="#" className="socMediaLinks"><ImInstagram className="socMediaIcons"/></Link></span>
              <span className="me-3"><Link to="#" className="socMediaLinks"><BsTwitter className="socMediaIcons"/></Link></span>
              <span className=""><Link to="#" className="socMediaLinks"><BsYoutube className="socMediaIcons"/></Link></span>
            </div>
          </div>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer;
