import { connect } from 'react-redux';
import React from 'react';
import SensorComponent from './SensorComponent.js';
import Fan from './Fan.js';
import { setTargetTemperature } from './actions.js';

const mapStateToProps = (state) => {
  const { currentTemperature, targetTemperature, fanOn } = state.targetSensor;

  return {
    title: 'Grill Temperature',
    label: 'Target',
    icon: ( <Fan on={ fanOn } /> ),
    max: 450,
    currentTemperature,
    setTemperature: targetTemperature,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (value) => {
      dispatch(setTargetTemperature(value));
    }
  }
};

const TargetSensor = connect(mapStateToProps, mapDispatchToProps)(SensorComponent);

export default TargetSensor;
