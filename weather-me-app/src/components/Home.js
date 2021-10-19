import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
//import React, { useState } from 'react';

const Home = () => {
    
    //const [currentWeather, generateWeather] = useState([]);

    let _showCurrentWeather = (e) => {
        //console.log(e.target.userSearch.value);
        //console.log(isNaN(e.target.userSearch.value));

       /*  fetch('http://api.weatherbit.io/v2.0/current?key=c6a854507d104074ab517d44871c8bf4&units=I&city=Miami')
        .then(res => res.json())
        .then(data => {
          console.log(data);
        }) */


        //let searchValue = e.target.userSearch.value;
        console.log(e);
        

 /*        let cityURL = `http://api.weatherbit.io/v2.0/current?key=c6a854507d104074ab517d44871c8bf4&units=I&city=${searchValue}`;
        let zipURL = `http://api.weatherbit.io/v2.0/current?key=c6a854507d104074ab517d44871c8bf4&units=I&postal_code=${searchValue}`;
        
        if(isNaN(searchValue) === true) {
            fetch(cityURL, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json())
              .then((data) => {
                console.log(data);
              })
        } else {
            fetch(zipURL, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then(res => res.json())
              .then((data) => {
                console.log(data);
              })
        }
 */
    }

    return(
        <div className="">
            <div>
                <Form onSubmit={_showCurrentWeather()} className="m-3">
                    <Row>
                        <Col>
                            <Form.Control name="userSearch" placeholder="Search By City or Zip" />
                        </Col>

                        <Col>
                            <Button variant="info" type="submit">
                                Submit
                            </Button>
                        </Col>          
                    </Row>
                </Form>
            </div>

            <div>Display Weather Below</div>

            <div></div>

        </div>

    )
}

export default Home;