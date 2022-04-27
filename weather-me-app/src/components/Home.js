import React, { useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Spinner from 'react-bootstrap/Spinner';
import { useHistory } from 'react-router-dom';
//import {getEnvironmentNews} from '../myFunctions/news.js';


const Home = () => {
  const history = useHistory();
  const [newsReturned, setNewsReturned] = useState([]);
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState('');
  const [lati, setLatitude] = useState(Number(localStorage.getItem('lat')));
  const [long, setLongitude] = useState(Number(localStorage.getItem('lon')));

  console.log(lati);
  console.log(long);

  
  useEffect(() => {
    setLoading(
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
   
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const newsUrl = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=14&section=environment';
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
    
   
    
    //Mozilla Geolocation API functionality
    function geoFindMe() {
      
      // Success functionality = fetch using users current latitude and longitude
      function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${latitude}&lon=${longitude}&units=I`)
        .then(response => response.json())
        .then(currWeather => {
            setWeather(currWeather.data[0]);
            setLoading('');
        })
        .catch(error => {
            console.error(error);
        });
      }
    
      // Failure functionality = fetch using users local storage lat and lon or New York as default if no local storage exists
      function error() {
        console.log("Unable to retrieve your location");
        
        if(localStorage.getItem('lat') && localStorage.getItem('lon')) {
            //console.log('using local storage lat and lon');
            let lat = Number(localStorage.getItem('lat'));
            let lon = Number(localStorage.getItem('lon'));
            let latLonUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I`;
            
            fetch(latLonUrl)
            .then(response => response.json())
            .then(rtnWeather => {
              setWeather(rtnWeather.data[0]);
              setLoading('');
            })
            .catch(error => {
              console.error(error);
            });
        } else {
            //console.log('using NYC as default');
            fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`)
            .then(response => response.json())
            .then(nycWeather => {
              setWeather(nycWeather.data[0]);
              setLoading('');
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
          //console.log('using local storage lat and lon');
          let lat = Number(localStorage.getItem('lat'));
          let lon = Number(localStorage.getItem('lon'));
          let latLonUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I`;
          
          fetch(latLonUrl)
          .then(response => response.json())
          .then(rtnWeather => {
            setWeather(rtnWeather.data[0]);
            setLoading('');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
          //console.log('using NYC as default');
          fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=New York&units=I`)
          .then(response => response.json())
          .then(nycWeather => {
            setWeather(nycWeather.data[0]);
            setLoading('');
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
        
  }, []);


    let redirectToToday = () => {
      history.push('/weather/today');
    }


    let allNews = newsReturned.map((article, index) => {
      return(
        <Col xs={12} key={index} className="mb-4">
          <section className="d-flex justify-content-center">
            <Card style={{ width: '65vw'}} className="p-3">
              <Row>
                  <Col lg={5} className="imgWrap">
                      <Card.Img id="articleImg" variant="top" src={article.fields.thumbnail} />
                  </Col>
    
                  <Col lg={7}>
                      <Card.Body>
                          <Card.Title id="articleHeadline">
                              <a href={article.webUrl} target="_blank" rel="noopener noreferrer">
                                  {article.fields.headline}
                              </a>
                          </Card.Title>
                          <Card.Text id="articleTrailText" dangerouslySetInnerHTML={ {__html: article.fields.trailText} }/>
                      </Card.Body>
                  </Col>
              </Row>
            </Card>
          </section>
        </Col>
      )
    })



  return(
    <div className="pageContainer d-flex flex-column">
      { weather === undefined ? (
          <div className="mt-5">
            <div className="text-center">{loading}</div>
          </div>
      ) : (
        <div>
          <div className="nonFooterWrapper">
              <SearchNav 
                  setLat={latitude => setLatitude(latitude)} 
                  setLon={longitude => setLongitude(longitude)}
                  redirectUser={() => redirectToToday()}
              />

              <main className="">
                  <Row className="homeWeatherRow">
                    <Col>
                      <div className="homeWeatherWrapper d-flex justify-content-center align-items-center">
                        <img height="38" width="auto" src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt={`${weather.weather.description} weather icon`} /> 
                        <span className="ms-2 homeWeather">{Math.round(weather.temp)}&#xb0; {weather.city_name}, {weather.state_code}</span>
                      </div>
                    </Col>
                  </Row>

                  <div className="newsContainer mx-auto d-flex flex-column">
                    <h1 className="weatherNewsHeader text-center mt-3 mb-4" style={{color: "white"}}>News</h1>
                    {allNews}
                  </div>
              </main>
          </div>

          <Footer/>
      </div>
      )
    }
    </div>
  )
}

export default Home;
