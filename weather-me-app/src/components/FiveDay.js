import { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import { Container } from "react-bootstrap";

class FiveDay extends Component {
  constructor() {
    super();
    this.state = {
      weather: [], //I just decided to name my key weather. I set it to an empty array as default. When I fetch my weather data, it will populate inside this array
      weatherLocation: [] //I need this state variable bc of how my API data returns. The city and state are outside of the data array that has all the weather info.  
    };
  }

  _handleWeather = (e) => {
    e.preventDefault();

    let searchValue = e.target.userSearch.value;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;


    //Used 16-Day Weather Forecast API
    let cityURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&units=I&city=${searchValue}&days=6`;
    let zipURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${API_KEY}&units=I&postal_code=${searchValue}&days=6`;

    this.setState({  //The reason to set state here is to always ensure the state is "reset" with every new user search. Otherwise, for example, my user may search say, Seattle. Then right afterwards, search an invalid city/zip. Then, Seattle weather AND my error message will both showing on the page. Oops! lol. This prevents that
      weather: [],
      weatherLocation: [],
      error: ''
    }, () => {
      if (isNaN(searchValue) === true) {
        fetch(cityURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((allWeatherInfo) => {  //It's me who just decided to call it allWeatherInfo. Could have called it anything
            this.setState({
              weather: allWeatherInfo.data, //This state variable has all of the weather details
              weatherLocation: allWeatherInfo
            });
            //console.log(this.state.weather.data[0]);
            //console.log(this.state.weatherLocation.city_name)
          }).catch(err => {
            console.log(err);
            this.setState({
              error: 'You have entered either an invalid city or zip code. Please try again'
            });
          });
      } else {
        fetch(zipURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((allWeatherInfo) => { //It's me who just decided to call it allWeatherInfo. Could have called it anything
            this.setState({
              weather: allWeatherInfo.data, //This state variable has all of the weather details
              weatherLocation: allWeatherInfo
            });
            //console.log(this.state.weather[0].city_name)
            //console.log(this.state.weatherLocation.city_name)
          }).catch(err => {
            console.log(err);
            this.setState({
              error: 'You have entered either an invalid city or zip code. Please try again'
            });
          })
      }
    })
  };

  render() {
    let fiveDays = this.state.weather.slice(1, 6);
    let fiveDayForecast = fiveDays.map((day) => {
      return (
        
          <Col style={{ marginRight: "1.5em" }}>
            <Card style={{ width: "18rem", marginBottom: "3.5rem", marginLeft: "2.5rem", padding: "0" }}>
              <Card.Body style={{backgroundColor: "#f8f4e3"}}>
                <Card.Title>{day.valid_date}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Text>
                  <span className="text-muted">High</span>
                  <h3>{day.max_temp}&deg;</h3>
                  <span className="text-muted">Low</span>
                  <h3>{day.low_temp}&deg;</h3>
                  <div>{day.weather.description}</div>
                  <div style={{ fontStyle: "italic" }}>
                    Chance of Rain {day.pop}&#37;
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
       
      ); //End of Return
    }); //End of Map Function

    return (
      <div className="">

        <Row>
          <Form onSubmit={this._handleWeather} className="m-3">
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

        <Row className="m-5 justify-content-center weatherTitle">5-Day Forecast: {this.state.weatherLocation.city_name}</Row>

        <Row className="mx-auto justify-content-center">{fiveDayForecast}</Row>

      </div> //End of main <div>
    ); //End of return ()
  } //End of render ()
} //End of FiveDay Component

export default FiveDay;