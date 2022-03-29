import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';
//import Row from "react-bootstrap/Row";
//import Col from "react-bootstrap/Col";
import SearchNav from "./SearchNav";
import Footer from "./Footer";


const Today = () => {
    //const [weather, setWeather] = useState([]);

    //Destructured object from the SearchNav.js return
    const {render, lat, lon} = SearchNav();
    
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      
        //Current Weather API Endpoint
        //let urlInitialSearch = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&lat=${latitude}&lon=${longitude}&units=I`;
        let url = `https://api.weatherbit.io/v2.0/current?key=${API_KEY}&lat=${lat}&lon=${lon}&units=I`;

        if(lat === 0 & lon === 0) {
            //try to fetch based on user computer location
            console.log('nothing in local storage rn');
        } 
        else {
            fetch(url)
            .then(response => response.json())
            .then(allWeather => {
                //setWeather(allWeather.data);
                console.log(allWeather.data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [lon]);




    return(
        <div className="todayContainer d-flex flex-column">
            <div className="nonFooterWrapper">
                {render} {/* The render from SearchNav.js */}
    
                <main>
                    <div className="weatherNewsContainer mx-auto">

                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
        
                </main>
            </div>
  
            <Footer/>
      </div>
    )
}

export default Today;