import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TemperatureSlider from './TemperatureSlider.js';

class SensorComponent extends Component {
  render() {
    const { title, actionElement, label,sliderDisabled } = this.props;

    return (
      <Container>
        <Row style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
          <Col xs={10}>
            <h5>{ title }</h5>
          </Col>
          <Col xs={2}>
            { actionElement }
          </Col>
        </Row>
        <Row style={{ paddingBottom: '1em' }}>
          <Col xs={2}>
            <p style={{ fontSize: '10px' }}>Current</p>
          </Col>
          <Col xs={10}>
            <TemperatureSlider {...this.props} />
          </Col>
        </Row>
        <Row style={{ paddingBottom: '1em' }}>
          <Col xs={2}>
            <p style={{ fontSize: '10px' }}>{label}</p>
          </Col>
          <Col xs={10}>
            <TemperatureSlider disabled={sliderDisabled} {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SensorComponent;
