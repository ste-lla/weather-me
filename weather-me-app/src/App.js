import { Component } from "react";
import './App.css';
import { Switch, Route, } from 'react-router-dom';
import Navigation from './components/Navigation'; //Navbar
import Home2 from './components/Home2';
import ThreeDay from './components/ThreeDay';
import FiveDay from './components/FiveDay';
import Footer from './components/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [], 
      error: ''
    };
  }
  
  render() {
    const {weather} = this.state;
    const {error} = this.state;
    //console.log(this.state.weather);

    return (
      <div className="main">
        <Navigation />
  
        <Switch>
          <Route exact path="/" component={Home2} weatherHomeChild={weather} errorHomeChild={error} />
          <Route path="/3-day-forecast" component={ThreeDay} weather3DayChild={weather} error3DayChild={error} />
          <Route path="/5-day-forecast" component={FiveDay} />
        </Switch>
  
        <Footer />
      </div>
    );
  } 
}

export default App;
