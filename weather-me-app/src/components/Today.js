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


const Today = () => {
    const [weatherReturned, setWeatherReturned] = useState();
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
                        //setTimeZone(currWeather.data[0].timezone);
                        setLoading('');
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
                            setLoading('');
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
                            setLoading('');
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
                            setLoading('');
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
                            setLoading('');
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
                //setTimeZone(allWeather.data[0].timezone);
                console.log(allWeather.data[0]);
            })
            .catch((error) => {
            console.error('Error:', error);
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
            //let localTime = `${hr}:${min} ${tod}`;


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

    

    
   
    
    return (
      <div className="pageContainer d-flex flex-column">
        {weatherReturned === undefined ? (
            <div className="mt-5">
                <div className="text-center">{loading}</div>
            </div>
          ) : (
            <div className="todayContentWrapper">
                <div className="nonFooterWrapper">
                    {/* setLat and setLon are props equal to a function that calls your state functions, setLatitude and setLongitude */}
                    <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />

                    <div className="weatherNewsContainer mx-auto mt-4 d-flex">
                        <Col xs={12} lg={9} className="d-flex justify-content-center">
                            <main className="">
                                <section className="weatherSectionCurrently">
                                    <Card className="weatherCardCurrently ps-2 pe-2">
                                        <Card.Body>
                                            <Row className="mb-3 currentWeatherRow">
                                                <Col className="me-2">
                                                    <div>
                                                        <Card.Title className="cityStateCurrently">Currently in {weatherReturned.city_name}</Card.Title>
                                                        <Card.Text className="currentTime">{localTime}</Card.Text>
                                                        <Card.Text className="descriptionCurrently">{weatherReturned.weather.description}</Card.Text>                       
                                                    </div>
                                                </Col>
                                                
                                                <Col className="d-flex justify-content-center">
                                                    <div>
                                                        <div className="d-flex currentTempContainer">
                                                            <div className="weatherImgContainer">
                                                                <img height="100" width="auto" src={`https://www.weatherbit.io/static/img/icons/${weatherReturned.weather.icon}.png`} alt={`${weatherReturned.weather.description} weather icon`} /> 
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

                                            <Row className="conditionsRow">
                                                <Col className="windCol conditionsCol d-flex justify-content-center align-items-center">
                                                    <div className="d-flex align-items-center windContainer conditionsContainer">
                                                        <BsWind className="weatherIcons" /> 
                                                        <Card.Text className="ms-2 conditions">Wind {Math.round(weatherReturned.wind_spd)}mph {weatherReturned.wind_cdir}</Card.Text>                                                                            
                                                    </div>
                                                </Col>

                                                <Col className="humidityCol conditionsCol d-flex justify-content-center align-items-center">
                                                    <div className="d-flex align-items-center humidityContainer conditionsContainer">
                                                        <SiRainmeter className="weatherIcons" />
                                                        <Card.Text className="ms-2 conditions">Humidity {Math.round(weatherReturned.rh)}&#37;</Card.Text>                                                                                      
                                                    </div>
                                                </Col>

                                                <Col className="uvCol conditionsCol d-flex justify-content-center align-items-center">
                                                    <div className="d-flex align-items-center uvContainer conditionsContainer">
                                                        <BsFillSunFill className="weatherIcons" />
                                                        <Card.Text className="ms-2 conditions">UV Index {parseInt(weatherReturned.uv)}</Card.Text>                                                                                          
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </section>

                                <section className="uvAICardsSection mt-4">
                                    <div className="uvAICardsContainer">
                                        <Card className="aiCard uvAICards">
                                            <Card.Body>
                                                <div className="d-flex">
                                                    <Card.Title>Air Quality Index</Card.Title>
                                                    <div id="aqiCircleColor" style={{backgroundColor: `${airIndexColor}`}}></div>
                                                </div>
                                                <Card.Subtitle className="mb-2">{weatherReturned.aqi} | {airIndex}</Card.Subtitle>
                                                <Card.Text>{airIndexDescription}</Card.Text>
                                                <Card.Text style={{fontSize: "0.8rem"}} className="mt-3">
                                                    *Credit to <a id="creditGovText" href="https://www.airnow.gov/aqi/aqi-basics/" target="_blank" rel="noopener noreferrer">airnow.gov</a> for AQI Descriptions
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>

                                        <Card className="uvCard uvAICards">
                                            <Card.Body>
                                                <div className="d-flex">
                                                    <Card.Title>UV Index</Card.Title>
                                                    <div id="uvCircleColor" style={{backgroundColor: `${uvIndexColor}`}}></div>
                                                </div>
                                                <Card.Subtitle className="mb-2">{parseInt(weatherReturned.uv)} | {uvIndex} </Card.Subtitle>
                                                <Card.Text>{uvIndexDescription}</Card.Text>        
                                                <Card.Text style={{fontSize: "0.8rem"}} className="mt-3">
                                                    *Credit to <a id="creditGovText" href="https://www.epa.gov/sunsafety/uv-index-scale-0" target="_blank" rel="noopener noreferrer">epa.gov</a> for UV Index Descriptions
                                                </Card.Text>                                                                                   
                                            </Card.Body>
                                        </Card>
                                    </div>
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
          )
        }
      </div>
    );
}

export default Today;