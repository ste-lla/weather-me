import React, { useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import Spinner from 'react-bootstrap/Spinner';
//import overcast from "../images/apiImgs/c04d.png";
//import TestBrand from "../images/cloud.jpeg"
//import { BsSunFill } from "react-icons/bs"


const Home = () => {
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
   
    const newsUrl = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=14&section=environment';
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
    //const ip_info_token = process.env.REACT_APP_IP_INFO_API_TOKEN;
    //const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

    fetch(newsUrl)
    .then(response => response.json())
    .then(data => {
      setNewsReturned(data.response.results);
    })
    .catch(error => {
      console.error(error);
    });


    //Fetch user current location with ip info api. Then, use location to fetch weather
    fetch("https://ipinfo.io/json?token=4c8e901b28bf22")
    .then(response => response.json())
    .then(location => {
      fetch(`https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&city=${location.city}&units=I`)
      .then(response => response.json())
      .then(currWeather => {
          setWeather(currWeather.data[0]);
          setLoading('');
      })
      .catch(error => {
        console.error(error);
      });
    })


/*     if(localStorage.getItem('lat') && localStorage.getItem('lon')) {
      //console.log('there is a lat and lon')
      let lat = Number(localStorage.getItem('lat'));
      let lon = Number(localStorage.getItem('lon'));
      let latLonUrl = `https://api.weatherbit.io/v2.0/current?key=${weather_api_key}&lat=${lat}&lon=${lon}&units=I`;
      
      fetch(latLonUrl)
      .then(response => response.json())
      .then(currentWeather => {
          //setWeather(allWeather.data);
          console.log(currentWeather.data);
      })
      .catch(error => {
        console.error(error);
      });
    } */
  }, []);


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
                  <Card.Title id="articleHeadline"><a href={article.webUrl} target="_blank" rel="noopener noreferrer">{article.fields.headline}</a></Card.Title>
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
              <SearchNav setLat={latitude => setLatitude(latitude)} setLon={longitude => setLongitude(longitude)} />

              <main>
                  <Row className="homeWeatherRow">
                    <Col>
                      <div className="homeWeatherWrapper d-flex justify-content-center align-items-center">
                        <img height="38" width="auto" src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`} alt={`${weather.weather.description} weather icon`} /> <span className="ms-2">{Math.round(weather.temp)}&#xb0; {weather.city_name}, {weather.state_code}</span>
                      </div>
                    </Col>
                  </Row>

                  <div className="newsContainer mx-auto mt-4 mb-4 pt-4 pb-3 d-flex flex-column">
                    <h1 className="weatherNewsHeader text-center mb-4" style={{color: "white"}}>News</h1>
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
