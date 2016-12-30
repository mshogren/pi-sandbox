import React, { Component } from 'react';
import SensorComponent from './SensorComponent.js';
import Fan from './Fan.js';

class TargetSensor extends Component {
  render() {
    return (
      <SensorComponent title="Grill Temperature" max={450} label="Target" actionElement={ <Fan on={ false } /> } />
    );
  }
}

export default TargetSensor;
