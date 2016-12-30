import React, { Component } from 'react';
import TargetSensor from './TargetSensor.js';
import AlarmSensor from './AlarmSensor.js';

class App extends Component {
  render() {
    return (
      <div>
        <TargetSensor />
        <AlarmSensor />
      </div>
    );
  }
}

export default App;
