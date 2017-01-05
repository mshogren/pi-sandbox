import React, { Component } from 'react';
import SensorComponent from './SensorComponent';
import Bell from './Bell';

class AlarmSensor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTemperature: 105,
      alarmTemperature: 140,
      alarmDisabled: true,
    }
  }

  handleChange = (value) => {
    this.setState({ alarmTemperature: value });
  }

  handleClick = (e) => {
    this.setState({ alarmDisabled: !this.state.alarmDisabled });
  }

  render() {
    const { currentTemperature, alarmTemperature, alarmDisabled } = this.state;

    const bellProps = {
      on: !alarmDisabled,
      handleClick: this.handleClick,
    };

    const bell = (
      <Bell { ...bellProps } />
    );

    const sensorComponentProps = {
      title: 'Meat Temperature',
      label: 'Alarm',
      icon: bell,
      max: 225,
      currentTemperature,
      setTemperature: alarmTemperature,
      handleChange: this.handleChange,
      sliderDisabled: alarmDisabled,
    };

    return (
      <SensorComponent { ...sensorComponentProps  } />
    );
  }
}

export default AlarmSensor;
