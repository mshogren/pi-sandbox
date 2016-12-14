var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var Sensor = require('./sensor.js');
var data = require('./config.js');
var gpioutil = require('pi-gpioutil');

module.exports = BBQController;

function BBQController() {
  if (!(this instanceof BBQController)) return new BBQController();

  this.target = 20;

  EventEmitter.call(this);
}

inherits(BBQController, EventEmitter);

BBQController.prototype.start = function start() {
  var self = this;

  data.sensors.forEach(function(s, i) {
    self._sensors = [];

    var sensor = Sensor(s.channel);
    self._sensors.push(sensor);

    sensor.start();

    sensor.on('temperatureChange', function(temp) {
      data.sensors[i].temperature = temp;

      if (i == 0) {
        var belowTarget = temp < self.target;

        gpioutil.write(24, belowTarget, function(err) {
          if (err) throw err;

          data.fan = belowTarget;
          data.date = new Date();

          self.emit('temperatureChange', data);
        });
      }
      else {
        data.date = new Date();

        self.emit('temperatureChange', data);
      }
    });
  });
};

BBQController.prototype.setTarget = function setTarget(target) {
  var self = this;

  self.target = target;

  var temp = data.sensors[0].temperature;

  var belowTarget = temp < self.target;

  gpioutil.write(24, belowTarget, function(err) {
    if (err) throw err;

    data.fan = belowTarget;
    data.date = new Date();

    self.emit('temperatureChange', data);
  });
};

BBQController.prototype.stop = function stop() {
  gpioutil.write(24, false, function(err) {
    if (err) throw err;
  });

  this._sensors.forEach(function(s) {
    s.stop();
  });
};

