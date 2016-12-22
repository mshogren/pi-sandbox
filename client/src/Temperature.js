import React, { Component } from 'react';

class Temperature extends Component {
  render() {
    return (
      <div className="TemperatureContainer">
        <div className="Name">
          Grill:
        </div>
        <div className="Temperature">
          225&deg;
        </div>
      </div>
    );
  }
}

export default Temperature;

