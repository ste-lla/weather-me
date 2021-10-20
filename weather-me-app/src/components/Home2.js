import { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import Overcast from "../images/Overcast.png"

class Home2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [], //I just decided to name my key weather. I set it to an empty array as default. When I fetch my weather data, it will populate inside this array
      error: '',
      test: ''
    };
  }

  _handleCurrentWeather = (e) => {
    e.preventDefault();

    let searchValue = e.target.userSearch.value;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    
    //Used Current Weather API
    let cityURL = `http://api.weatherbit.io/v2.0/current?key=${API_KEY}&units=I&city=${searchValue}`;
    let zipURL = `http://api.weatherbit.io/v2.0/current?key=${API_KEY}&units=I&postal_code=${searchValue}`;

    this.setState({
      weather: [],
      error: ''
    }, () => {
    //This is a callback function set inside of the this.setState 
      if (isNaN(searchValue) === true) {
        fetch(cityURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((allWeatherInfo) => { //It's me who just decided to call it allWeatherInfo. Could have called it anything
            this.setState({
              weather: allWeatherInfo.data, //This changes our state from the default empty array [] and sets state to the weather data we fetched
            })
          }).catch(err => {
            console.log(err);
            this.setState({
              error: 'You have entered either an invalid city or zip code. Please try again'
            })
          })
      } else {
            fetch(zipURL, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((allWeatherInfo) => {   //It's me who just decided to call it allWeatherInfo. Could have called it anything
                this.setState({
                  weather: allWeatherInfo.data,   //This changes our state from the default empty array [] and sets state to the weather data we fetched
                })
              }).catch(err => {
                console.log(err);
                this.setState({
                  error: 'You have entered either an invalid city or zip code. Please try again'
                })
              })
        }
    })
  };


  
  render() {
    //I have to map through my setState variable (which holds the ALL the data I'm fetching) in order to "grab" the data I want. Otherwise, it returns undefined when I try to "grab" something specific from all the fetched data
    let theWeather = this.state.weather.map((weatherData) => { //In this line of code, the blue colored word, weather, is just the key of the state you had defined in your constructor()
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        //Trying to add logic for weather icon
       /*  const images = [
          {src: 'Overcast', pod: 'd', description: "Overcast"},
          {src: 'ClearNight', pod: 'n', description: "clear Clear"}
        ]
        let icon = images.map((img) => {
          if(weatherData.pod === img.pod && weatherData.weather.description.includes(img.description) === true) {
            console.log('we have a match');
            return(
              console.log(img.src)
            )
          } 
          return(img.src)
        }) */

        return (
            
                <Card style={{ width: "18rem", padding: "0" }}>
                  {/* <Card.Img variant="top" src={} style={{width: "5.5rem", height: "5rem", backgroundColor: "#d3d3d3", paddingRight: "0.5rem"}} /> */}
                    <Card.Body style={{backgroundColor: "#f8f4e3"}}>
                        <Card.Title>{weatherData.city_name}, {weatherData.state_code}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{days[new Date().getDay().toLocaleString() + ""]} {new Date().toLocaleString() + ""}</Card.Subtitle>
                        <Card.Text>
                            <h3>{weatherData.temp}&deg;</h3>
                            <div>{weatherData.weather.description}</div>
                            <div>Feels like {weatherData.app_temp}&deg;</div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            
        ); //End of return()
    });  //End of map() function

    return (
      <div>

        <Row>
          <Form onSubmit={this._handleCurrentWeather} onChange={(e) => this.setState({test: e.target.value})} className="m-3">
            <Row>
              <Col>
                <Form.Control
                  name="userSearch"
                  placeholder="Search By City or Zip"
                />
              </Col>

              <Col>
                <Button variant="info" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>

        <Row className="m-2 justify-content-center">{this.state.error}</Row>

        <Row className="m-5 justify-content-center weatherTitle">Current Weather</Row>

        <Row className="justify-content-center">{theWeather}</Row> 

      </div>
    );
  }
}

export default Home2;
