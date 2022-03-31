import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchNav from "./SearchNav";
import Footer from "./Footer";


const Today = () => {
    //const [weather, setWeather] = useState([]);
    const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));

    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    
        //Current Weather API Endpoint
        //let urlInitialSearch = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&lat=${latitude}&lon=${longitude}&units=I`;
        let url = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&lat=${lati}&lon=${long}&units=I`;

        if(lati === 0 & long === 0) {
            //try to fetch based on user computer location
            console.log('nothing in local storage rn');
        } 
        else {
            fetch(url)
            .then(response => response.json())
            .then(allWeather => {
                //setWeather(allWeather.data);
                console.log(allWeather.data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [long]);




    return (
      <div className="todayContainer d-flex flex-column">
        <div className="nonFooterWrapper">
    
            <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />

            <div className="weatherNewsContainer mx-auto mt-4 mb-4 pt-4 pb-3 d-flex">
                <Col xs={12} md={9} className="d-flex justify-content-center">
                    <main className="">
                        <section className="">
                            <Card className="weatherCardToday">
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Card.Link href="#">Card Link</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>
                        </section>
                    </main>
                </Col>

                <Col xs={12} md={3} className="d-flex justify-content-center">
                    <aside>
                        <section className="">
                            <Card className="newsCard p-3">
                                <Row>
                                    <Col className="imgWrap">
                                        <Card.Img id="articleImg" variant="top" src="" />
                                    </Col>

                                    <Col>
                                        <Card.Body>
                                        <Card.Title id="articleHeadline">
                                            {/* <a href="" target="_blank" rel="noopener noreferrer">
                                                {article.fields.headline}
                                            </a> */}
                                        </Card.Title>
                                        <Card.Text>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a 
                                        piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard 
                                        </Card.Text>
                                        <Card.Text id="articleTrailText" /* dangerouslySetInnerHTML={{__html: article.fields.trailText}} *//>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        </section>
                    </aside>
                </Col>
            </div>
        </div>

        <Footer />

      </div>
    );
}

export default Today;