import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TemperatureSlider from './TemperatureSlider.js';

class SensorComponent extends Component {
  render() {
    const { title, label, icon, currentTemperature, setTemperature, handleChange, sliderDisabled } = this.props;

    return (
      <Container>
        <Row style={{ paddingTop: '0.5em', paddingBottom: '1em' }}>
          <Col xs={10}>
            <h5>{ title }</h5>
          </Col>
          <Col xs={2}>
            { icon }
          </Col>
        </Row>
        <Row style={{ paddingBottom: '1em' }}>
          <Col xs={2}>
            <p style={{ fontSize: '10px' }}>Current</p>
          </Col>
          <Col xs={10}>
            <TemperatureSlider value={currentTemperature} {...this.props} />
          </Col>
        </Row>
        <Row style={{ paddingBottom: '1em' }}>
          <Col xs={2}>
            <p style={{ fontSize: '10px' }}>{label}</p>
          </Col>
          <Col xs={10}>
            <TemperatureSlider defaultValue={setTemperature} disabled={sliderDisabled} onAfterChange={handleChange} {...this.props} />
          </Col>
        </Row>
      </Container>
    );
  }
}

SensorComponent.defaultProps = {
  currentTemperature: 0,
  setTemperature: 0,
};

export default SensorComponent;
