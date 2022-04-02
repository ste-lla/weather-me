import './Styles.css';
import { Switch, Route, } from 'react-router-dom';
import Home from './components/Home';
import Today from './components/Today';
import Hourly from './components/Hourly';
//import ThreeDay from './components/ThreeDay';
//import FiveDay from './components/FiveDay';
//import SearchNav from './components/SearchNav';

function App() {
  return(
    <div className="appContainer">
      {/* <SearchNav/> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/weather/today" component={Today} />
        <Route exact path="/weather/hourly" component={Hourly} />
        {/* <Route path="/3-day-forecast" component={ThreeDay}  /> */}
        {/* <Route path="/5-day-forecast" component={FiveDay} /> */}
      </Switch>
    </div>
  );
}

export default App;

