import React, { useState, useEffect } from 'react';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Accordion from 'react-bootstrap/Accordion';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from 'react-bootstrap/Spinner';
import {IoWater} from 'react-icons/io5';
import { BsWind } from 'react-icons/bs';
import { BsSun } from 'react-icons/bs';
import { BsSunriseFill } from 'react-icons/bs';
import { FiSunset } from 'react-icons/fi';


const TenDay = () => {
    const [weather, setWeather] = useState();
    const [city, setCity] = useState();
    const [timezone, setTimezone] = useState();
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
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I&days=11`)
                    .then(response => response.json())
                    .then(weatherReturned => {
                        setWeather(weatherReturned.data);
                        setCity(weatherReturned.city_name);
                        setTimezone(weatherReturned.timezone);
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
                        let tenDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days11`

                        //fetch 5 day weather
                        fetch(tenDayUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
                            setLoading('');
                            console.log('geoFindMe failed. Using loc storage for todays weather');
                            console.log(weatherReturned.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        let tenDayNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=11`
                        
                        //fetch 5 day NYC weather
                        fetch(tenDayNycUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
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
                        let tenDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=11`
                        
                        //fetch 5 day weather
                        fetch(tenDayUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
                            setLoading('');
                            console.log('geoFindMe not supported. Using loc storage for current weather');
                        })
                        .catch(error => {
                        console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        let tenDayNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=11`

                        //fetch 5 day NYC weather
                        fetch(tenDayNycUrl)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeather(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
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
            const tenDayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I&days=11`
            
            //fetch 5 Day weather
            fetch(tenDayUrl)
            .then(response => response.json())
            .then(weatherReturned => {
                setWeather(weatherReturned.data);
                setCity(weatherReturned.city_name);
                setTimezone(weatherReturned.timezone);
                setLoading('');
                console.log(weatherReturned);
                //console.log('geoFindMe success. Using local storage for current weather');
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [long])



    if(weather !== undefined && timezone !== undefined) {

        let weatherDisplayed = weather.slice(1).map((weatherDay, index) => {

            //Manipulated returned date to display as mm/dd instead of yyyy-mm-dd
            let month = Number(weatherDay.datetime.split("-")[1]);
            let day = Number(weatherDay.datetime.split("-")[2]);
            let year = weatherDay.datetime.split("-")[0];
            let date = `${month}-${day}-${year}`
            let shortDate = `${month}/${day}`
            
            //Use returned date to get day of the week
            const weekday = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
            const d = new Date(date);
            let dayOfWeek = weekday[d.getDay()];

            //Convert unix time to milliseconds. Use new Date(milliseconds) and convert to localeString
            const unixSunrise = weatherDay.sunrise_ts;
            const unixSunset = weatherDay.sunset_ts;

            const millisecondsSunrise = unixSunrise * 1000;
            const millisecondsSunset = unixSunset * 1000;

            const dateObjectSunrise = new Date(millisecondsSunrise);
            const dateObjectSunset = new Date(millisecondsSunset);

            const sunriseDate = dateObjectSunrise.toLocaleString("en-US", {timeZone: `${timezone}`});
            const sunsetDate = dateObjectSunset.toLocaleString("en-US", {timeZone: `${timezone}`});

            let splitSunrise = sunriseDate.split(',')[1].split(":");
            let splitSunset = sunsetDate.split(',')[1].split(":");

            let sunriseHr = splitSunrise[0];
            let sunsetHr = splitSunset[0];
            
            let sunriseMin = splitSunrise[1];
            let sunsetMin = splitSunset[1];

            let sunriseTime = `${sunriseHr}:${sunriseMin} AM`
            let sunsetTime = `${sunsetHr}:${sunsetMin} PM`

            //console.log(sunriseTime, sunsetTime);

            
            return(
                <Accordion.Item key={index} eventKey={index} className="accordionItemMargin">
                    <Accordion.Header className="accordionHeader">
                        <Col xs={12} sm={6} md={4} className="d-flex dailyDateImgTempCol">
                            <div className="dailyCondMargin d-flex flex-column align-items-center conditions">
                                <div>{dayOfWeek}</div>
                                <div>{shortDate}</div>
                            </div>

                            <div className="dailyCondMargin d-flex align-items-center">
                                <img className="dailyWeatherImg" src={`https://www.weatherbit.io/static/img/icons/${weatherDay.weather.icon}.png`} alt={`${weatherDay.weather.description} weather icon`} /> 
                            </div>

                            <div className="d-flex align-items-center conditions">
                                {Math.round(weatherDay.high_temp)}&deg;|{Math.round(weatherDay.low_temp)}&deg;
                            </div>                                                      
                        </Col>
                            
                        <Col xs={12} sm={6} md={4} className="d-flex dailyDescriptionCol">
                            <div className="d-flex align-items-center conditions">
                                {weatherDay.weather.description}
                            </div>
                        </Col>

                        <Col xs={12} md={4} className="d-flex dailyPopWindCol">
                            <div className="dailyCondMargin d-flex align-items-center">
                                <IoWater className="weatherIcons" />
                                <span className="ms-1 conditions">{weatherDay.pop}&#37;</span>
                            </div>

                            <div className="dailyCondMargin d-flex align-items-center me-2">
                                <BsWind className="weatherIcons" />
                                <span className="ms-2 conditions">{Math.round(weatherDay.wind_spd)}mph {weatherDay.wind_cdir}</span>
                            </div>
                        </Col>                        
                    </Accordion.Header>
                    
                    <Accordion.Body>
                        <Row>
                            <Col xs={12} sm={6}>
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer dailyUVContainer">
                                    <BsSun className="weatherIcons dailyWeatherIcons" />
                                    <span className="dailyCondMargin conditions">UV Index</span>
                                    <span className="conditions">{parseInt(weatherDay.uv)}</span>
                                </div>
                            </Col>

                            <Col xs={12} sm={6}>
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer dailyHumidContainer">
                                    <IoWater className="weatherIcons dailyWeatherIcons" />
                                    <span className="dailyCondMargin conditions">Humidity</span>
                                    <span className="conditions">{Math.round(weatherDay.rh)}&#37;</span>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} sm={6}>
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer">
                                    <BsSunriseFill className="weatherIcons dailyWeatherIcons" />
                                    <span className="dailyCondMargin conditions">Sunrise</span>
                                    <span className="conditions">{sunriseTime}</span>
                                </div>
                            </Col>

                            <Col xs={12} sm={6}>
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer">
                                    <FiSunset className="weatherIcons dailyWeatherIcons" />
                                    <span className="dailyCondMargin conditions">Sunset</span>
                                    <span className="conditions">{sunsetTime}</span>
                                </div>
                            </Col>
                        </Row>
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
                        <section className="accordionSection">
                            <Accordion className ="accordion">
                                <h1 className="text-center forecastHeader" style={{color: "white"}}>10 Day Forecast</h1> 
                                <p className="text-center mb-3 cityName" style={{color: "white"}}>{city}</p>
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

export default TenDay;