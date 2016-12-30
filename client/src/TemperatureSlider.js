import React, { Component } from 'react';
import Slider from 'rc-slider';
import './TemperatureSlider.css';

class SliderHandle extends Component {
  propTypes: {
    value: React.PropTypes.any,
    offset: React.PropTypes.number,
  }

  render() {
    const { value, offset, disabled } = this.props;

    const handleStyle = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: '2px',
      border: '2px solid',
      borderColor: disabled ? '#efefef' : '#abe2fb',
      borderRadius: '3px',
      background: '#fff',
      fontSize: '14px',
      textAlign: 'center',
      left: `${offset}%`,
    };

    return (
      <div style={handleStyle}>{value}°F</div>
    );
  }
}

class TemperatureSlider extends Component {
  render() {
    return (
      <Slider {...this.props} handle={<SliderHandle disabled={this.props.disabled} />} />
    );
  }
}

export default TemperatureSlider;
