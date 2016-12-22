import React, { Component } from 'react';
import { Navbar, Container, Row, Col } from 'reactstrap';
import TemperatureSlider from './Slider.js';
import Fan from './Fan.js';
import Temperature from './Temperature.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Container>
          <Row>
            <Col xs="12">
              <Fan/>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 10, offset: 1 }}>
              <TemperatureSlider/>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 4, offset: 4 }}>
              <Temperature/>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 4, offset: 4 }}>
              <Temperature/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
