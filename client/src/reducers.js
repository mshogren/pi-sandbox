import { SET_TARGET_TEMPERATURE_SUCCESS, SET_BBQ_STATE } from './actions.js';

const initialState = {
  targetSensor: {
    currentTemperature: 205,
    targetTemperature: 225,
    fanOn: false,
  }
};

function bbqpi(state = initialState, action) {
  switch(action.type) {
    case SET_TARGET_TEMPERATURE_SUCCESS:
      return {
        targetSensor: {
          currentTemperature: state.targetSensor.currentTemperature,
          targetTemperature: action.temperature,
          fanOn: state.targetSensor.fanOn,
        }
      };

    case SET_BBQ_STATE:
      return {
        targetSensor: {
          currentTemperature: action.snapshot.grillSensor.temperature,
          targetTemperature: state.targetSensor.targetTemperature,
          fanOn: action.snapshot.fan,
        }
      };

    default:
      return state;
  }
}

export default bbqpi;
