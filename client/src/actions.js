import * as firebase from 'firebase';

export const SET_TARGET_TEMPERATURE_SUCCESS = 'SET_TARGET_TEMPERATURE_SUCCESS';
export const SET_BBQ_STATE = 'SET_BBQ_STATE';

function setTargetTemperatureSuccess(temperature) {
  return {
    type: SET_TARGET_TEMPERATURE_SUCCESS,
    temperature,
  };
};

function setBbqState(snapshot) {
  return {
    type: SET_BBQ_STATE,
    snapshot,
  };
};

const config = {
  apiKey: 'AIzaSyC7ytk2f7G4PezRda903EaPMuTBLJRZjxg',
  authDomain: 'bbqpi-b8026.firebaseapp.com',
  databaseURL: 'https://bbqpi-b8026.firebaseio.com',
}

firebase.initializeApp(config);

export function login() {
  return (dispatch) => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (result) => console.log(result),
      (err) => console.log(err)
    )
  }
};

export function setTargetTemperature(temperature) {
  return (dispatch) => {
    const ref = firebase.database().ref('targetTemperature');

    ref.set(temperature).then(
      () => dispatch(setTargetTemperatureSuccess(temperature)),
      (err) => console.log(err)
    );
  }
};

export function listenForStateChanges() {
  return (dispatch) => {
    const ref = firebase.database().ref('state').limitToLast(1);

    ref.on('child_added', (snapshot) => {
      dispatch(setBbqState(snapshot.val()));
    });
  }
};
