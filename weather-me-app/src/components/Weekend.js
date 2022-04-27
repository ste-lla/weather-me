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


const Weekend = () => {
    const [weather, setWeather] = useState();
    const [weatherNxtWeekend, setWeatherNxtWeekend] = useState();
    const [city, setCity] = useState();
    const [timezone, setTimezone] = useState();
    const [loading, setLoading] = useState('');
    const [slicePoint, setSlicePoint] = useState();
    const [slicePtNxtWknd, setSlicePtNxtWeekend] = useState();
    const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));

    useEffect(() => {
       setLoading(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )

        let daysReturned;
        let daysRtnNextWeekend;

        switch (new Date().getDay()) {
            case 0:
                setSlicePoint(0);
                daysReturned = 1;
                setSlicePtNxtWeekend(5);
                daysRtnNextWeekend = 8;
                break;
            case 1:
                setSlicePoint(4);
                daysReturned = 7;
                setSlicePtNxtWeekend(11);
                daysRtnNextWeekend = 14;
                break;
            case 2:
                setSlicePoint(3);
                daysReturned = 6;
                setSlicePtNxtWeekend(10);
                daysRtnNextWeekend = 13;
                break;
            case 3:
                setSlicePoint(2);
                daysReturned = 5;
                setSlicePtNxtWeekend(9);
                daysRtnNextWeekend = 12;
                break;
            case 4:
                setSlicePoint(1);
                daysReturned = 4;
                setSlicePtNxtWeekend(8);
                daysRtnNextWeekend = 11;
                break;
            case 5:
                setSlicePoint(0);
                daysReturned = 3;
                setSlicePtNxtWeekend(7);
                daysRtnNextWeekend = 10;
                break;
            case 6:
                setSlicePoint(0);
                daysReturned = 2;
                setSlicePtNxtWeekend(6);
                daysRtnNextWeekend = 9;
                break;
            default:
                setSlicePoint(0);
                daysReturned = 3;
          }

          //console.log(slicePoint, daysReturned);

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

                    //fetch weather for this weekend
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I&days=${daysReturned}`)
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

                    //fetch weather for next weekend
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I&days=${daysRtnNextWeekend}`)
                    .then(response => response.json())
                    .then(weatherReturned => {
                        setWeatherNxtWeekend(weatherReturned.data);
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
                        let weekendUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=${daysReturned}`

                        //fetch weather for this weekend
                        fetch(weekendUrl)
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

                        //fetch weather for next weekend
                        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=${daysRtnNextWeekend}`)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeatherNxtWeekend(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
                            setLoading('');
                            console.log('geoFineMe success. Using user geo lat/lon todays weather');
                            console.log(weatherReturned.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');
                        let weekendNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=${daysReturned}`
                        
                        //fetch this weekend NYC weather
                        fetch(weekendNycUrl)
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

                        //fetch next weekend NYC weather
                        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=${daysRtnNextWeekend}`)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeatherNxtWeekend(weatherReturned.data);
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
                }
            
                // Geolocation not supported functionality = same as failure functionality above
                if(!navigator.geolocation) {
                    console.log("Geolocation is not supported by your browser");
            
                    if(localStorage.getItem('lat') && localStorage.getItem('lon')) {
                        console.log('using local storage lat and lon');
                        let lat = Number(localStorage.getItem('lat'));
                        let lon = Number(localStorage.getItem('lon'));
                        let weekendUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=${daysReturned}`
                        
                        //fetch this weekend weather
                        fetch(weekendUrl)
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

                        //fetch weather for next weekend
                        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=${daysRtnNextWeekend}`)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeatherNxtWeekend(weatherReturned.data);
                            setCity(weatherReturned.city_name);
                            setTimezone(weatherReturned.timezone);
                            setLoading('');
                            console.log('geoFineMe success. Using user geo lat/lon todays weather');
                            console.log(weatherReturned.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });

                    } else {
                        console.log('using NYC as default');
                        let weekendNycUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=${daysReturned}`

                        //fetch this weekend NYC weather
                        fetch(weekendNycUrl)
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

                        //fetch next weekend NYC weather
                        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=${daysRtnNextWeekend}`)
                        .then(response => response.json())
                        .then(weatherReturned => {
                            setWeatherNxtWeekend(weatherReturned.data);
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
                    return;
                } else {
                    navigator.geolocation.getCurrentPosition(success, error);
                }
            }
            geoFindMe();
        } 
        //If lat and lon are in local storage...
        else {
            const weekendUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I&days=${daysReturned}`
            
            //fetch this weekend weather
            fetch(weekendUrl)
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

            //fetch weather for next weekend
            fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I&days=${daysRtnNextWeekend}`)
            .then(response => response.json())
            .then(weatherReturned => {
                setWeatherNxtWeekend(weatherReturned.data);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps  
    }, [long])



    if(weather !== undefined && timezone !== undefined && slicePoint !== undefined && weatherNxtWeekend !== undefined && slicePtNxtWknd !== undefined) {


        let weatherDisplayed = weather.slice(slicePoint).map((weatherDay, index) => {

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
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer dailySunriseContainer">
                                    <BsSunriseFill className="weatherIcons dailyWeatherIcons" />
                                    <span className="dailyCondMargin conditions">Sunrise</span>
                                    <span className="conditions">{sunriseTime}</span>
                                </div>
                            </Col>

                            <Col xs={12} sm={6}>
                                <div className="d-flex align-items-center justify-content-center dailyConditionsContainer dailySunsetContainer">
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



        let nextWeekend = weatherNxtWeekend.slice(slicePtNxtWknd).map((weatherDay, index) => {

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
                <Accordion.Item key={index} eventKey={index+3} className="accordionItemMargin">
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
                                <span className="ms-2 me-2 conditions">{Math.round(weatherDay.wind_spd)}mph {weatherDay.wind_cdir}</span>
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
                                <h1 className="text-center forecastHeader" style={{color: "white"}}>Weekend Forecast</h1> 
                                <p className="text-center mb-3 cityName" style={{color: "white"}}>{city}</p>

                                <p className="mb-3 weekendSubtitle" style={{color: "white"}}>This Weekend</p>
                                {weatherDisplayed} 

                                <p className="mb-3 mt-5 weekendSubtitle" style={{color: "white"}}>Next Weekend</p>
                                {nextWeekend}         
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

export default Weekend;