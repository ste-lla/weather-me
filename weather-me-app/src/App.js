import './Styles.css';
import { Switch, Route, } from 'react-router-dom';
import Home from './components/Home';
import Today from './components/Today';
import Hourly from './components/Hourly';
import FiveDay from './components/FiveDay';
import TenDay from './components/TenDay';
import Weekend from './components/Weekend';

function App() {
  return(
    <div className="appContainer">
      {/* <SearchNav/> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/weather/today" component={Today} />
        <Route exact path="/weather/hourly" component={Hourly} />
        <Route exact path="/weather/fiveday" component={FiveDay} /> 
        <Route exact path="/weather/tenday" component={TenDay} /> 
        <Route exact path="/weather/weekend" component={Weekend} /> 
      </Switch>
    </div>
  );
}

export default App;

