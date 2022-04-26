import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Spinner from 'react-bootstrap/Spinner';
import { BsWind } from 'react-icons/bs';
import { SiRainmeter } from 'react-icons/si';
import { BsFillSunFill } from 'react-icons/bs';
import { FaTemperatureLow } from 'react-icons/fa';
import { BsFillCloudRainFill } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import { BsArrowsCollapse } from 'react-icons/bs';
import { MdWaterDrop } from 'react-icons/md';
import { IoIosCloud } from 'react-icons/io';
import { BsSunriseFill } from 'react-icons/bs';
import { FiSunset } from 'react-icons/fi';




const Today = () => {
    const [weatherReturned, setWeatherReturned] = useState();
    const [todaysWeather, setTodaysWeather] = useState();
    const [newsReturned, setNewsReturned] = useState([]);
    const [loading, setLoading] = useState('');
    const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
    const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));
    const [localTime, setLocalTime] = useState('');
    const [airIndex, setAirIndex] = useState('');
    const [airIndexDescription, setAirIndexDescription] = useState('Air quality index description cannot be pulled at this time.');
    const [airIndexColor, setAirIndexColor] = useState('black');
    const [uvIndex, setUvIndex] = useState('');
    const [uvIndexDescription, setUvIndexDescription] = useState('UV index description cannot be pulled at this time.');
    const [uvIndexColor, setUvIndexColor] = useState('black');


    useEffect(() => {
        setLoading(
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
        
        const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
        const newsUrl = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=8&section=world';
        //const ip_info_token = process.env.REACT_APP_IP_INFO_API_TOKEN;
        //const guardian_api_key = process.env.REACT_APP_GUARDIAN_API_KEY;
    
        //Fetch news data
        fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
          setNewsReturned(data.response.results);
          setLoading('');
        })
        .catch(error => {
          console.log(error);
        });


        //If no lat or lon in local storage...
        if(lati === 0 & long === 0) {
            console.log('nothing in local storage rn');
            //Mozilla Geolocation API functionality
            function geoFindMe() {
                // Success functionality = fetch using users current latitude and longitude
                function success(position) {
                    const latitude  = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    
                    //fetch current weather
                    fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I`)
                    .then(response => response.json())
                    .then(currWeather => {
                        setWeatherReturned(currWeather.data[0]);
                        setLoading('');
                        console.log('geoFindMe success. Using user geo lat/lon current weather');
                    })
                    .catch(error => {
                        console.error(error);
                    });

                    //fetch todays weather
                    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I&days=1`)
                    .then(response => response.json())
                    .then(todaysWeather => {
                        setTodaysWeather(todaysWeather.data[0]);
                        setLoading('');
                        console.log('geoFineMe success. Using user geo lat/lon todays weather');
                        console.log(todaysWeather.data[0]);
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
                        let todaysUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=1`
                        
                        //fetch current weather
                        fetch(latLonUrl)
                        .then(response => response.json())
                        .then(rtnWeather => {
                            setWeatherReturned(rtnWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe failed. Using loc storage for current weather');
                        })
                        .catch(error => {
                            console.error(error);
                        });

                        //fetch todays weather
                        fetch(todaysUrl)
                        .then(response => response.json())
                        .then(todaysWeather => {
                            setTodaysWeather(todaysWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe failed. Using loc storage for todays weather');
                            console.log(todaysWeather.data[0]);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');

                        let currentNYCUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`
                        let todayNYCUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=1`
                        
                        //fetch current weather
                        fetch(currentNYCUrl)
                        .then(response => response.json())
                        .then(nycWeather => {
                            setWeatherReturned(nycWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe failed. No loc storage. Using NYC default current weather');
                        })
                        .catch(error => {
                            console.error(error);
                        });


                        //fetch todays weather
                        fetch(todayNYCUrl)
                        .then(response => response.json())
                        .then(todaysWeather => {
                            setTodaysWeather(todaysWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe failed. No loc storage. Using NYC default todays weather');
                            console.log(todaysWeather.data[0]);
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
                        let todaysUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I&days=1`
                        
                        //fetch current weather
                        fetch(latLonUrl)
                        .then(response => response.json())
                        .then(rtnWeather => {
                            setWeatherReturned(rtnWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe not supported. Using loc storage for current weather');
                        })
                        .catch(error => {
                        console.error(error);
                        });

                        //fetch todays weather
                        fetch(todaysUrl)
                        .then(response => response.json())
                        .then(todaysWeather => {
                            setTodaysWeather(todaysWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe not supported. Using loc storage for todays weather');
                            console.log(todaysWeather.data[0]);
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    } else {
                        console.log('using NYC as default');

                        let currentNYCUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`
                        let todayNYCUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&city=New York&units=I&days=1`

                        //fetch current weather
                        fetch(currentNYCUrl)
                        .then(response => response.json())
                        .then(nycWeather => {
                            setWeatherReturned(nycWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe not supported. Using NYC default for current weather');
                        })
                        .catch(error => {
                        console.error(error);
                        });

                        //fetch todays weather
                        fetch(todayNYCUrl)
                        .then(response => response.json())
                        .then(todaysWeather => {
                            setTodaysWeather(todaysWeather.data[0]);
                            setLoading('');
                            console.log('geoFindMe not supported. Using NYC default for todays weather');
                            console.log(todaysWeather.data[0]);
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
            const currentUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I`;
            const todayUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weather_api_key}&lat=${lati}&lon=${long}&units=I&days=1`
            
            //fetch current weather
            fetch(currentUrl)
            .then(response => response.json())
            .then(allWeather => {
                setWeatherReturned(allWeather.data[0]);
                setLoading('');
                console.log(allWeather.data[0]);
                //console.log('geoFindMe success. Using local storage for current weather');
            })
            .catch((error) => {
            console.error('Error:', error);
            });

            //fetch todays weather
            fetch(todayUrl)
            .then(response => response.json())
            .then(todaysWeather => {
                setTodaysWeather(todaysWeather.data[0]);
                setLoading('');
                console.log(todaysWeather.data[0]);
                //console.log('geoFindMe success. Using local storage for todays weather');
            })
            .catch(error => {
                console.error(error);
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [long]);



      useEffect(() => {
        if(weatherReturned !== undefined) {
            //Get user local time using new Date() & .toLocaleString
            let userLocalTime = new Date().toLocaleString("en-US", {timeZone: `${weatherReturned.timezone}`});
            let timeOnly = userLocalTime.slice(10);
            let finalTime = timeOnly.split(":");
            let todArray = finalTime[2].split(" ");
            let hr = finalTime[0];
            let min = finalTime[1]
            let tod = todArray[1];
            setLocalTime(`${hr}:${min} ${tod}`);
            

            //Set Air Quality Index Level 
            if(weatherReturned.aqi <= 50) {
                setAirIndex('Good');
                setAirIndexDescription('Air quality is satisfactory, and air pollution poses little or no risk.');
                setAirIndexColor('limegreen');
            }

            if(weatherReturned.aqi >= 51 && weatherReturned.aqi <= 100 ) {
                setAirIndex('Moderate');
                setAirIndexDescription('Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.');
                setAirIndexColor('yellow');
            }

            if(weatherReturned.aqi >= 101 && weatherReturned.aqi <= 150 ) {
                setAirIndex('Unhealthy for Sensitive Groups');
                setAirIndexDescription('Members of sensitive groups may experience health effects. The general public is less likely to be affected.');
                setAirIndexColor('orange');
            }

            if(weatherReturned.aqi >= 151 && weatherReturned.aqi <= 200 ) {
                setAirIndex('Unhealthy');
                setAirIndexDescription('Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.');
                setAirIndexColor('red');
            }

            if(weatherReturned.aqi >= 201 && weatherReturned.aqi <= 300 ) {
                setAirIndex('Very Unhealthy');
                setAirIndexDescription('Health alert: The risk of health effects is increased for everyone.');
                setAirIndexColor('purple');
            }

            if(weatherReturned.aqi >= 301) {
                setAirIndex('Hazardous');
                setAirIndexDescription('Health warning of emergency conditions: everyone is more likely to be affected.');
                setAirIndexColor('maroon');;
            }


            //Set UV Index Levels
            if(parseInt(weatherReturned.uv) <= 2) {
                setUvIndex('Low');
                setUvIndexDescription('No protection needed. You can safely stay outside using minimal sun protection.');
                setUvIndexColor('limegreen');
            }

            if(parseInt(weatherReturned.uv) >= 3 && parseInt(weatherReturned.uv) <= 5) {
                setUvIndex('Moderate');
                setUvIndexDescription('Protection needed. Seek shade during late morning through mid-afternoon.');
                setUvIndexColor('yellow');
            }

            if(parseInt(weatherReturned.uv) >= 6 && parseInt(weatherReturned.uv) <= 7) {
                setUvIndex('High');
                setUvIndexDescription('Protection needed. Seek shade during late morning through mid-afternoon.');
                setUvIndexColor('orange');
            }

            if(parseInt(weatherReturned.uv) >= 8 && parseInt(weatherReturned.uv) <= 10) {
                setUvIndex('Very High');
                setUvIndexDescription('Extra protection needed. Be careful outside, especially during late morning through mid-afternoon.');
                setUvIndexColor('red');
            }

            if(parseInt(weatherReturned.uv) > 11) {
                setUvIndex('Extreme');
                setUvIndexDescription('Extra protection needed. Be careful outside, especially during late morning through mid-afternoon.');
                setUvIndexColor('purple');
            }

        }
      }, [weatherReturned])

    

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

    
    if(weatherReturned !== undefined && todaysWeather !== undefined && newsReturned !== undefined) {

        //Covert millibars (mb) to inches and round to 2nd decimal 
        let pressure = todaysWeather.pres * 0.0295301;
        pressure = pressure.toFixed(2);

        //Convert unix time to milliseconds. Use new Date(milliseconds) and convert to localeString
        const unixSunrise = todaysWeather.sunrise_ts;
        const unixSunset = todaysWeather.sunset_ts;

        const millisecondsSunrise = unixSunrise * 1000;
        const millisecondsSunset = unixSunset * 1000;

        const dateObjectSunrise = new Date(millisecondsSunrise);
        const dateObjectSunset = new Date(millisecondsSunset);

        const sunriseDate = dateObjectSunrise.toLocaleString("en-US", {timeZone: `${weatherReturned.timezone}`});
        const sunsetDate = dateObjectSunset.toLocaleString("en-US", {timeZone: `${weatherReturned.timezone}`});

        let splitSunrise = sunriseDate.split(',')[1].split(":");
        let splitSunset = sunsetDate.split(',')[1].split(":");

        let sunriseHr = splitSunrise[0];
        let sunsetHr = splitSunset[0];
        
        let sunriseMin = splitSunrise[1];
        let sunsetMin = splitSunset[1];

        let sunriseTime = `${sunriseHr}:${sunriseMin} AM`
        let sunsetTime = `${sunsetHr}:${sunsetMin} PM`

        //console.log(sunriseTime, sunsetTime);
      
        return (
            <div className="pageContainer d-flex flex-column">
                <div className="todayContentWrapper">
                    <div className="nonFooterWrapper">
                        {/* setLat and setLon are props equal to a function that calls your state functions, setLatitude and setLongitude */}
                        <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />

                        <div className="weatherNewsContainer mx-auto d-flex">
                            <Col xs={12} lg={9} className="d-flex justify-content-center">
                                <main className="">
                                    <section className="">
                                        <Card className="weatherCard">
                                            <Card.Body>
                                                <Row className="currentTodayWeatherRows">
                                                    <Col className="me-2">
                                                        <div>
                                                            <Card.Title className="cityToday">Currently in {weatherReturned.city_name}</Card.Title>
                                                            <Card.Text className="currentTime">{localTime}</Card.Text>
                                                            <Card.Text className="descriptionToday">{weatherReturned.weather.description}</Card.Text>                       
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col className="d-flex justify-content-center">
                                                        <div>
                                                            <div className="d-flex tempContainer">
                                                                <div className="weatherImgContainer">
                                                                    <img className="weatherImgToday" src={`https://www.weatherbit.io/static/img/icons/${weatherReturned.weather.icon}.png`} alt={`${weatherReturned.weather.description} weather icon`} /> 
                                                                </div>
                                                                <div className="currentTemp">{Math.round(weatherReturned.temp)}&deg;<span id="fahrenheit">F</span></div>
                                                                {/* <div className="degSymbol"></div>
                                                                <div className="farSymbol">F</div> */}
                                                            </div>

                                                            <div className="feelsLike">
                                                                Feels Like {Math.round(weatherReturned.app_temp)}&#8457;
                                                            </div> 
                                                        </div>                                                                                         
                                                    </Col>
                                                </Row>

                                                <Row className="">
                                                    <Col xs={12} sm={9} lg={4} xl={4} className="windCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <BsWind className="weatherIcons me-2" />
                                                            <span className="conditions">Wind</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {Math.round(weatherReturned.wind_spd)}mph {weatherReturned.wind_cdir}
                                                        </Card.Text>                                                                            
                                                    </Col>

                                                    <Col xs={12} sm={7} lg={4} xl={4} className="humidityCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <SiRainmeter className="weatherIcons me-2" />
                                                            <span className="conditions">Humidity</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {Math.round(weatherReturned.rh)}&#37;
                                                        </Card.Text>                                                                                      
                                                    </Col>

                                                    <Col xs={12} sm={4} lg={3} className="uvCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <BsFillSunFill className="weatherIcons me-2" />
                                                            <span className="conditions">UV Index</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {parseInt(weatherReturned.uv)}
                                                        </Card.Text>                                                                                          
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </section>


                                    <section className="uvAICardsSection mt-5">
                                        <div className="uvAICardsContainer">
                                            <Card className="aiCard uvAICards">
                                                <Card.Body className="aqiUvCardBody">
                                                    <div className="d-flex">
                                                        <Card.Title className="aqiUvTitle">Air Quality Index</Card.Title>
                                                        <div id="aqiCircleColor" style={{backgroundColor: `${airIndexColor}`}}></div>
                                                    </div>
                                                    <Card.Subtitle className="mb-2 aqiUvSubtitle">{weatherReturned.aqi} | {airIndex}</Card.Subtitle>
                                                    <Card.Text className="aqiUvText">{airIndexDescription}</Card.Text>
                                                    <Card.Text className="mt-3 creditGovText" style={{fontSize: "0.8rem"}}>
                                                        *Credit to <a id="creditGovText" href="https://www.airnow.gov/aqi/aqi-basics/" target="_blank" rel="noopener noreferrer">airnow.gov</a> for AQI Descriptions
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>

                                            <Card className="uvCard uvAICards">
                                                <Card.Body className="aqiUvCardBody">
                                                    <div className="d-flex">
                                                        <Card.Title className="aqiUvTitle">UV Index</Card.Title>
                                                        <div id="uvCircleColor" style={{backgroundColor: `${uvIndexColor}`}}></div>
                                                    </div>
                                                    <Card.Subtitle className="mb-2 aqiUvSubtitle">{parseInt(weatherReturned.uv)} | {uvIndex} </Card.Subtitle>
                                                    <Card.Text className="aqiUvText">{uvIndexDescription}</Card.Text>        
                                                    <Card.Text className="mt-3 creditGovText" style={{fontSize: "0.8rem"}}>
                                                        *Credit to <a id="creditGovText" href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank" rel="noopener noreferrer">epa.gov</a> for UV Index Descriptions
                                                    </Card.Text>                                                                                   
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </section>


                                    <section className="mt-5">
                                        <Card className="weatherCard">
                                            <Card.Body>
                                                <Row className="currentTodayWeatherRows">
                                                    <Col className="me-2">
                                                        <div>
                                                            <Card.Title className="cityToday">Today in {weatherReturned.city_name}</Card.Title>
                                                            <Card.Text className="descriptionToday">{weatherReturned.weather.description}</Card.Text>                       
                                                        </div>
                                                    </Col>
                                                    
                                                    <Col className="d-flex justify-content-center">
                                                        <div>
                                                            <Card.Title id="currentlyText">Currently</Card.Title>
                                                            <div className="d-flex tempContainer">
                                                                <div className="weatherImgContainer">
                                                                    <img className="weatherImgToday" src={`https://www.weatherbit.io/static/img/icons/${weatherReturned.weather.icon}.png`} alt={`${weatherReturned.weather.description} weather icon`} /> 
                                                                </div>
                                                                <div className="currentTemp">{Math.round(weatherReturned.temp)}&deg;<span id="fahrenheit">F</span></div>                                                          
                                                            </div>
                                                        </div>                                                                                         
                                                    </Col>
                                                </Row>

                                                <Row className="">
                                                    <Col xs={12} sm={7} xl={4} className="hiLoCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <FaTemperatureLow className="weatherIcons me-2" /> 
                                                            <span className="conditions">High|Low</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {Math.round(todaysWeather.high_temp)}&deg;|{Math.round(todaysWeather.low_temp)}&deg;
                                                        </Card.Text>                                                                            
                                                    </Col>

                                                    <Col xs={12} sm={4} xl={3} className="popCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <BsFillCloudRainFill className="weatherIcons me-2" />
                                                            <span className="conditions">POP</span>
                                                        </div>

                                                        <Card.Text className="conditions">
                                                            {Math.round(todaysWeather.pop)}&#37;
                                                        </Card.Text> 
                                                    </Col>

                                                    <Col xs={12} sm={4} xl={4} className="visibilityCol conditionsCol d-flex align-items-center justify-content-around">                                       
                                                        <div className="">
                                                            <FaRegEye className="weatherIcons me-2" />
                                                            <span className="conditions">Visibility</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {Math.round(todaysWeather.vis)} mi
                                                        </Card.Text>                                                                                          
                                                    </Col>
                                                {/* </Row> */}

                                                {/* <Row className=""> */}
                                                    <Col xs={12} sm={7} xl={4} className="dewPointCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <MdWaterDrop className="weatherIcons me-2" />
                                                            <span className="conditions">Dew Point</span>
                                                        </div>
                                                            
                                                        <Card.Text className="conditions">
                                                            {Math.round(todaysWeather.dewpt)}&deg;
                                                        </Card.Text>                                                                                      
                                                    </Col>

                                                    <Col xs={12} sm={5} xl={3} className="cloudCoverCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <IoIosCloud className="weatherIcons me-2" />
                                                            <span className="conditions">Cloud Cover</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {Math.round(todaysWeather.clouds)}&#37;
                                                        </Card.Text>                                                                                          
                                                    </Col>

                                                    <Col xs={12} sm={6} xl={4} className="pressureCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <BsArrowsCollapse className="weatherIcons me-2" /> 
                                                            <span className="conditions">Pressure</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {pressure} in
                                                        </Card.Text>                                                                            
                                                    </Col>

                                                    <Col xs={12} sm={6} className="sunriseCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <BsSunriseFill className="weatherIcons me-2" /> 
                                                            <span className="conditions">Sunrise</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {sunriseTime}
                                                        </Card.Text>                                                                            
                                                    </Col>

                                                    <Col xs={12} sm={5} className="sunsetCol conditionsCol d-flex align-items-center justify-content-around">
                                                        <div className="">
                                                            <FiSunset className="weatherIcons me-2" /> 
                                                            <span className="conditions">Sunset</span>
                                                        </div>
                                                        
                                                        <Card.Text className="conditions">
                                                            {sunsetTime}
                                                        </Card.Text>                                                                            
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </section>
                                </main>
                            </Col>

                            <Col xs={12} lg={3} className="d-flex justify-content-center worldNewsCol mb-4">
                                <aside className="todayAside">
                                    <h4 className="text-center worldNewsHeadline">World News Today</h4>
                                    {allNews}
                                </aside>
                            </Col>  
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        );
    }
    
    return (
      <div className="pageContainer d-flex flex-column">
          <div className="mt-5 text-center">{loading}</div>
      </div>
    );
}

export default Today;