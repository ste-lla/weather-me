import { Component } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Weather3Day extends Component {
    constructor() {
        super();
        this.state = {
          weather: [], //I just decided to name my key weather. I set it to an empty array as default. When I fetch my weather data, it will populate inside this array
          weatherLocation: [] //I need this state variable bc of how my API data returns. The city and state are outside of the data array that has all the weather info.  
        };
      }
    
      _handleWeather = (e) => {
        e.preventDefault();
        //console.log(e.target.userSearch.value);
    
        let searchValue = e.target.userSearch.value;
    
        //Used 16-Day Weather Forecast API
        let cityURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=c6a854507d104074ab517d44871c8bf4&units=I&city=${searchValue}&days=4`;
        let zipURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=c6a854507d104074ab517d44871c8bf4&units=I&postal_code=${searchValue}&days=4`;
    
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
            });
        }
      };
    
    render() {
        let threeDays = this.state.weather.slice(1, 4);
        let threeDayForecast = threeDays.map((day) => {
          return (
              <Col>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
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
        
        return(
           {threeDayForecast}
        )
    }
}

export default Weather3Day;
    
 
      
   