import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchNav from "./SearchNav";
import Footer from "./Footer";


const Today = () => {
    const [weatherReturned, setWeatherReturned] = useState();
    const [newsReturned, setNewsReturned] = useState([]);
    const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));

    useEffect(() => {
        const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
        const newsUrl = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=8&section=world';
        //const ip_info_token = process.env.REACT_APP_IP_INFO_API_TOKEN;
        //const guardian_api_key = process.env.REACT_APP_GUARDIAN_API_KEY;
    
        //Fetch news data
        fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
          setNewsReturned(data.response.results);
          console.log(data.response.results);
        })
        .catch(error => {
          console.log(error);
        });


        //If not lat or lon in local storage...
        if(lati === 0 & long === 0) {
            console.log('nothing in local storage rn');
            //Mozilla Geolocation API functionality
            function geoFindMe() {
                // Success functionality = fetch using users current latitude and longitude
                function success(position) {
                    const latitude  = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I`)
                    .then(response => response.json())
                    .then(currWeather => {
                        setWeatherReturned(currWeather.data[0]);
                        //setLoading('');
                        console.log('geoFineMe success');
                        console.log(weatherReturned);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
            
                // Failure functionality = fetch using users local storage lat and lon or New York as default if no local storage exists
                function error() {
                    console.log("Unable to retrieve your location");
                    
                    if(localStorage.getItem('lat') && localStorage.getItem('lon')) {
                        console.log('using local storage lat and lon');
                        let lat = Number(localStorage.getItem('lat'));
                        let lon = Number(localStorage.getItem('lon'));
                        let latLonUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I`;
                        
                        fetch(latLonUrl)
                        .then(response => response.json())
                        .then(rtnWeather => {
                            setWeatherReturned(rtnWeather.data[0]);
                            //setLoading('');
                            console.log('geoFineMe failed. Using loc storage');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`)
                        .then(response => response.json())
                        .then(nycWeather => {
                            setWeatherReturned(nycWeather.data[0]);
                            //setLoading('');
                            console.log('geoFineMe failed. Using NYC default');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    }
                }
            
                // Geolocation not supported functionality = same as failure functionality above
                if(!navigator.geolocation) {
                    console.log("Geolocation is not supported by your browser");
            
                    if(localStorage.getItem('lat') && localStorage.getItem('lon')) {
                        console.log('using local storage lat and lon');
                        let lat = Number(localStorage.getItem('lat'));
                        let lon = Number(localStorage.getItem('lon'));
                        let latLonUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I`;
                        
                        fetch(latLonUrl)
                        .then(response => response.json())
                        .then(rtnWeather => {
                            setWeatherReturned(rtnWeather.data[0]);
                            //setLoading('');
                            console.log('geoFindMe not sprtd. Using loc storage');
                        })
                        .catch(error => {
                        console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`)
                        .then(response => response.json())
                        .then(nycWeather => {
                            setWeatherReturned(nycWeather.data[0]);
                            //setLoading('');
                            console.log('geoFindMe not sprtd. Using NYC default');
                        })
                        .catch(error => {
                        console.error(error);
                        });
                    }
                    return;
                } else {
                    navigator.geolocation.getCurrentPosition(success, error);
                }
            }
        
            geoFindMe();
        } 
        //If lat and lon are in local storage...
        else {
            const url = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I`;
            
            fetch(url)
            .then(response => response.json())
            .then(allWeather => {
                setWeatherReturned(allWeather.data[0]);
                console.log(allWeather.data[0]);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [long]);

    

    let allNews = newsReturned.map((article, index) => {
        return(
            <Col xs={12} key={index} className="mb-4 d-flex justify-content-center">
                <section className="">
                    <Card className="newsCard p-2">
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                <Card.Img id="articleImgToday" variant="top" src={article.fields.thumbnail} />
                            </Col>

                            <Col xs={12}>
                                <Card.Body className="text-center">
                                    <Card.Title id="articleHeadlineToday">
                                        <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
                                            {article.fields.headline}
                                        </a>
                                    </Card.Title>
                                    <Card.Text id="articleTextToday" dangerouslySetInnerHTML={{__html: article.fields.trailText}}/>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </section>
            </Col>
        )
    })


    return (
      <div className="pageContainer d-flex flex-column">
        <div className="nonFooterWrapper">

            {/* setLat and setLon are props equal to a function that calls your state functions, setLatitude and setLongitude */}
            <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />

            <div className="weatherNewsContainer mx-auto mt-4 mb-4 pt-4 pb-3 ps-2 pe-2 d-flex">
                <Col xs={12} lg={9} className="d-flex justify-content-center">
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

                <Col xs={12} lg={3} className="d-flex justify-content-center worldNewsCol">
                    <aside className="todayAside">
                        <h4 className="text-center worldNewsHeadline">World News Today</h4>
                        {allNews}
                    </aside>
                </Col>
            </div>
        </div>

        <Footer />

      </div>
    );
}

export default Today;