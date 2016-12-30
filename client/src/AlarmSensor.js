import React, { Component } from 'react';
import SensorComponent from './SensorComponent.js';
import Bell from './Bell.js';

class AlarmSensor extends Component {
  handleClick(e) {
    console.log('there');
  }

  render() {
    return (
      <SensorComponent title="Meat Temperature" max={225} label="Alarm" sliderDisabled={true} actionElement={ <Bell handleClick={this.handleClick} /> } />
    );
  }
}

export default AlarmSensor;
