import React, { useState, useEffect } from 'react';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Accordion from 'react-bootstrap/Accordion';
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import {IoWater} from 'react-icons/io5';
import { BsWind } from 'react-icons/bs';

const FiveDay = () => {
    const [weather, setWeather] = useState();
    const [loading, setLoading] = useState('');
    const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));


    useEffect(() => {
       setLoading(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )

        const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;

        //If no lat or lon in local storage...
        if(lati === 0 & long === 0) {
            console.log('nothing in local storage rn');
            //Mozilla Geolocation API functionality
            function geoFindMe() {
                // Success functionality = fetch using users current latitude and longitude
                function success(position) {
                    const latitude  = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    //fetch 5 day weather
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I&days=6`)
                    .then(response => response.json())
                    .then(weatherReturned => {
                        setWeather(weatherReturned.data);
                        setLoading('');
                        console.log('geoFineMe success. Using user geo lat/lon todays weather');
                        console.log(weatherReturned.data);
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
                        let fiveDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=6`

                        //fetch 5 day weather
                        fetch(fiveDayUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setLoading('');
                            console.log('geoFindMe failed. Using loc storage for todays weather');
                            console.log(weatherReturned.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        let fiveDayNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=6`
                        
                        //fetch 5 day NYC weather
                        fetch(fiveDayNycUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setLoading('');
                            console.log('geoFindMe failed. No loc storage. Using NYC default current weather');
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
                        let fiveDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=6`
                        
                        //fetch 5 day weather
                        fetch(fiveDayUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setLoading('');
                            console.log('geoFindMe not supported. Using loc storage for current weather');
                        })
                        .catch(error => {
                        console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        let fiveDayNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=6`

                        //fetch 5 day NYC weather
                        fetch(fiveDayNycUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setLoading('');
                            console.log('geoFindMe not supported. Using NYC default for current weather');
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
            const fiveDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I&days=6`
            
            //fetch 5 Day weather
            fetch(fiveDayUrl)
            .then(response => response.json())
            .then(weatherReturned => {
                setWeather(weatherReturned.data);
                setLoading('');
                console.log(weatherReturned.data);
                //console.log('geoFindMe success. Using local storage for current weather');
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [long])



    if(weather !== undefined) {

        let weatherDisplayed = weather.slice(1).map((weatherDay, index) => {

            let month = Number(weatherDay.datetime.split("-")[1]);
            let day = Number(weatherDay.datetime.split("-")[2]);
            let year = weatherDay.datetime.split("-")[0];
            let date = `${month}-${day}-${year}`
            let shortDate = `${month}/${day}`
            
            const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            const d = new Date(date);
            let dayOfWeek = weekday[d.getDay()];

            
            return(
                <Accordion.Item key={index} eventKey={index} className="mb-2">
                    <Accordion.Header className="accordionHeader">
                        <Col xs={12} sm={6} md={4} className="d-flex dailyDateImgTempCol">
                            <div className="me-4 d-flex flex-column align-items-center">
                                <div>{dayOfWeek}</div>
                                <div>{shortDate}</div>
                            </div>

                            <div className="me-4 d-flex align-items-center">
                                <img height="50" width="auto" src={`https://www.weatherbit.io/static/img/icons/${weatherDay.weather.icon}.png`} alt={`${weatherDay.weather.description} weather icon`} /> 
                            </div>

                            <div className="d-flex align-items-center">
                                {Math.round(weatherDay.high_temp)}&deg;|{Math.round(weatherDay.low_temp)}&deg;
                            </div>                                                      
                        </Col>
                            
                        <Col xs={12} sm={6} md={4} className="d-flex dailyDescriptionCol">
                            <div className="d-flex align-items-center">
                                {weatherDay.weather.description}
                            </div>
                        </Col>

                        <Col xs={12} md={4} className="d-flex dailyPopWindCol">
                            <div className="d-flex align-items-center me-4">
                                <IoWater />
                                <span className="ms-1">{weatherDay.pop}&#37;</span>
                            </div>

                            <div className="d-flex align-items-center me-2">
                                <BsWind />
                                <span className="ms-2">{Math.round(weatherDay.wind_spd)}mph {weatherDay.wind_cdir}</span>
                            </div>
                        </Col>                        
                    </Accordion.Header>
                    
                    <Accordion.Body>
                        Some random body text. Some random body text. Some random body text.
                        Some random body text. Some random body text. Some random body text.
                        Some random body text. Some random body text. Some random body text.
                    </Accordion.Body>
                </Accordion.Item>
            )
        })

        return(
            <div className="pageContainer d-flex flex-column">
                <div className="nonFooterWrapper">
                    {/* setLat and setLon are props equal to a function that calls your state functions, setLatitude and setLongitude */}
                    <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />
    
                    <main>
                        <section>
                            <Accordion className ="accordion mt-4 mb-4">
                                {weatherDisplayed}           
                            </Accordion>
                        </section>
                    </main>
    
                </div>
    
                <Footer />
            </div>
        );
    }

    return (
        <div className="pageContainer d-flex flex-column">
            <div className="mt-5 text-center">{loading}</div>
        </div>
    );
}

export default FiveDay;


