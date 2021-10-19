import { Component } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <div>
          <Form onSubmit={this._handleCurrentWeather} className="m-3">
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
        </div>
      </div>
    );
  }
}

export default SearchBar;
