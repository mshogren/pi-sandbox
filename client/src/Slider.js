import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const handleStyle = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    padding: '2px',
    border: '2px solid #abe2fb',
    borderRadius: '3px',
    background: '#fff',
    fontSize: '14px',
    textAlign: 'center',
};

class SliderHandle extends Component {
  propTypes: {
    value: React.PropTypes.any,
    offset: React.PropTypes.number,
  }
  render() {
    const props = this.props;
    const style = Object.assign({ left: `${props.offset}%` }, handleStyle);
    return (
      <div style={style}>{props.value}°F</div>
    );
  }
}

const marks = {
  0: '0°F',
  225: '225°F',
  325: '325°F',
}

class TemperatureSlider extends Component {
  render() {
    return (
      <Slider min={0} max={450} marks={marks} handle={<SliderHandle/>} />
    );
  }
}

export default TemperatureSlider;
