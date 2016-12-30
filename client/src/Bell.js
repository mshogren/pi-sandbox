import React, { Component } from 'react';

class Bell extends Component {
  render() {
    const { handleClick } = this.props;

    const style = {
      display: 'block',
      margin: '0 auto',
      width: '32px',
      height: '32px',
    };

    return (
      <span onClick={handleClick}>
        <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="#e9e9e9" d="M14,20A2,2 0 0,1 12,22A2,2 0 0,1 10,20H14M12,2A1,1 0 0,1 13,3V4.08C15.84,4.56 18,7.03 18,10V16L21,19H3L6,16V10C6,7.03 8.16,4.56 11,4.08V3A1,1 0 0,1 12,2Z" />
        </svg>
      </span>
    );
  }
}

export default Bell;
