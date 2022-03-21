import { Component } from "react";
//import Form from "react-bootstrap/Form";
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
//import Button from "react-bootstrap/Button";
//import Card from "react-bootstrap/Card";
import SearchNav from "./SearchNav";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [], //I just decided to name my key weather. I set it to an empty array as default. When I fetch my weather data, it will populate inside this array
      error: '',
      test: ''
    };
  }


/*   
    REMEMBER THE USE EFFECT ()

    _handleNews = () => {
    //console.log('clicked test btn');
    let url = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d';

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  } */





/*   _handleCurrentWeather = (e) => {
    e.preventDefault();

    let searchValue = e.target.userSearch.value;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    
    //Used Current Weather API
    let cityURL = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&units=I&city=${searchValue}`;
    let zipURL = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&units=I&postal_code=${searchValue}`;

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
        .then((allWeatherInfo) => { 
          this.setState({
            weather: allWeatherInfo.data, //Changes state from the default empty array [] to the weather data fetched
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: 'You have entered either an invalid city or zip code. Please try again'
          })
        })
      } 
      else {
        fetch(zipURL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.json())
        .then((allWeatherInfo) => { 
          this.setState({
            weather: allWeatherInfo.data,  //Changes state from the default empty array [] to the weather data fetched
          })
        })
        .catch(err => {
          console.log(err);
          this.setState({
            error: 'You have entered either an invalid city or zip code. Please try again'
          })
        })
      }
    })
  }; */


  render() {
    //Map through the weather (from state) to get the data
/*     let theWeather = this.state.weather.map((weatherData, index) => { //In this line of code, the blue colored word, weather, is just the key of the state you had defined in your constructor()
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return (
          <Card key={index} style={{ width: "18rem", padding: "0" }}>
            <Card.Img variant="top" src={} style={{width: "5.5rem", height: "5rem", backgroundColor: "#d3d3d3", paddingRight: "0.5rem"}} />
              <Card.Body style={{backgroundColor: "#f8f4e3"}}>
                  <Card.Title>{weatherData.city_name}, {weatherData.state_code}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{days[new Date().getDay()]} {new Date().toLocaleString() + ""}</Card.Subtitle>
                  
                  <div>
                      <h3>{weatherData.temp}&deg;</h3>
                      <div>{weatherData.weather.description}</div>
                      <div>Feels like {weatherData.app_temp}&deg;</div>
                  </div>
              </Card.Body>
          </Card>
            
        ); 
    }); */ 

    return (
      <div className="homeContainer">
        <SearchNav />

        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus.

{/*         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus.


        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam commodo 
        ullamcorper. Morbi pellentesque ipsum sit amet sem tincidunt elementum. 
        Curabitur et ligula sit amet nibh cursus commodo condimentum nec quam. 
        Quisque aliquet, odio eu lobortis suscipit, leo diam vestibulum orci, et 
        aliquam eros lectus eget mi. Curabitur ut interdum nisl, a egestas justo. 
        Pellentesque ut felis vitae sem blandit rhoncus. Morbi malesuada eros ut 
        ante efficitur feugiat. Etiam semper scelerisque arcu, id tempus leo 
        hendrerit eget. Sed vitae mauris rutrum, imperdiet augue nec, ultrices dui. 
        Maecenas pharetra odio nunc, venenatis molestie augue sollicitudin sed. 
        Etiam et augue porttitor, efficitur massa sit amet, consequat diam. 
        Suspendisse sollicitudin, eros a lobortis volutpat, odio neque finibus 
        sapien, sed efficitur est felis ut magna. Nulla facilisis ullamcorper 
        ligula, a congue erat laoreet vel. Curabitur pellentesque neque nec sapien 
        euismod, eu ullamcorper nulla cursus. Proin nunc ex, interdum eget ex in, 
        pretium viverra ex. Integer vitae imperdiet diam, in accumsan tellus. 
        Aliquam luctus leo at enim rutrum bibendum. Interdum et malesuada fames ac 
        ante ipsum primis in faucibus. */}
        </div>

      </div>
    );
  }
}

export default Home;
