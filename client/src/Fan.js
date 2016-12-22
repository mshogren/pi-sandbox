import React, { Component } from 'react';
import fan from './fan.svg';
import './Fan.css';

class Fan extends Component {
  render() {
    return (
      <img src={fan} className="Fan Animate" alt="fan" />
    );
  }
}

export default Fan;

