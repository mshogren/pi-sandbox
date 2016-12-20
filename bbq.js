const inherits = require('util').inherits;
const EventEmitter = require('events').EventEmitter;
const Sensor = require('./sensor.js');
const data = require('./config.js');
const gpioutil = require('pi-gpioutil');

function BBQController() {
  if (!(this instanceof BBQController)) return new BBQController();

  EventEmitter.call(this);

  const self = this;

  self.target = 20;
  self.sensors = [];

  data.sensors.forEach((s, i) => {
    const sensor = Sensor(s.channel);
    self.sensors.push(sensor);

    sensor.start();

    sensor.on('temperatureChange', (temp) => {
      data.sensors[i].temperature = temp;

      if (i === 0) {
        const belowTarget = temp < self.target;

        gpioutil.write(24, belowTarget, (err) => {
          if (err) throw err;

          data.fan = belowTarget;
          data.date = new Date();

          self.emit('temperatureChange', data);
        });
      } else {
        data.date = new Date();

        self.emit('temperatureChange', data);
      }
    });
  });
}

inherits(BBQController, EventEmitter);

BBQController.prototype.setTarget = function setTarget(target) {
  const self = this;

  self.target = target;

  const temp = data.sensors[0].temperature;

  const belowTarget = temp < self.target;

  gpioutil.write(24, belowTarget, (err) => {
    if (err) throw err;

    data.fan = belowTarget;
    data.date = new Date();

    self.emit('temperatureChange', data);
  });
};

BBQController.prototype.stop = function stop() {
  gpioutil.write(24, false, (err) => {
    if (err) throw err;
  });

  this.sensors.forEach((s) => {
    s.stop();
  });
};

module.exports = BBQController;
