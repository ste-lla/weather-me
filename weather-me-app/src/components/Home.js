import React, { useState, useEffect} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import SearchNav from "./SearchNav";
import Footer from "./Footer";
import { BsSunFill } from "react-icons/bs"


const Home = () => {
  const [newsReturned, setNewsReturned] = useState([]);
  //const API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;
  
  useEffect(() => {
    const url = 'https://content.guardianapis.com/search?format=json&show-fields=headline,short-url,thumbnail,trailText&api-key=1cc443ab-d1d1-4546-87b0-c2d68710146d&page-size=14&section=weather';
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setNewsReturned(data.response.results);
      console.log(data.response.results);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  }, []);


  let allNews = newsReturned.map((article, index) => {
    return(
      <Col xs={12} key={index} className="mb-4">
        <article className="d-flex justify-content-center">
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
        </article>
      </Col>
    )
  })



  return(
    <div className="homeContainer d-flex flex-column">
      <div className="nonFooterWrapper">
        <SearchNav />

        <main>
            <Row className="homeWeatherRow">
              <Col>
                <div className="homeWeatherWrapper d-flex justify-content-center">
                  <BsSunFill style={{fontSize: "1.3rem"}} /> <span className="ms-2">72&#xb0; Orlando, FL</span>
                </div>
              </Col>
            </Row>

            <div className="newsContainer mx-auto mt-4 mb-4 pt-4 pb-3 d-flex flex-column">
              <h1 className="weatherNewsHeader">Weather News</h1>
              {allNews}
            </div>
        </main>

      </div>

      <Footer/>

    </div>
  )
}

export default Home;
