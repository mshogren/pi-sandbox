const bbq = require('./bbq.js')();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json'),
  databaseURL: 'https://bbqpi-b8026.firebaseio.com',
  databaseAuthVariableOverride: {
    uid: 'bbqpi-service',
  },
});

const db = admin.database();
const stateRef = db.ref('state');
const tempRef = db.ref('targetTemperature');

const period = 1000 * 60 * 60 * 0.016666;

const truncateData = function truncateData() {
  const toDeleteRef = stateRef.orderByChild('timestamp').endAt((Date.now() - period));
  toDeleteRef.on('child_added', (toDelete) => {
    toDelete.ref.remove().then(
      () => {},
      (err) => {
        console.log(err);
      });
  });
};

truncateData();
const interval = setInterval(truncateData, period);

const gracefulShutdown = function gracefulShutdown() {
  clearInterval(interval);
  bbq.stop();
  db.goOffline();
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

bbq.on('temperatureChange', (data) => {
  const record = data;
  record.timestamp = admin.database.ServerValue.TIMESTAMP;
  stateRef.push(data).then(
    () => {},
    (err) => {
      console.log(err);
    });
});

tempRef.on('value', (data) => {
  const temp = data.val();
  bbq.setTarget(temp);
  console.log('Target: ', temp);
});
