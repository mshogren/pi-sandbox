var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var Sensor = require('./sensor.js');
var data = require('./config.js');
var gpioutil = require('pi-gpioutil');

module.exports = BBQController;

function BBQController() {
  if (!(this instanceof BBQController)) return new BBQController();

  EventEmitter.call(this);
}

inherits(BBQController, EventEmitter);

BBQController.prototype.target = 20;

BBQController.prototype.start = function start() {
  var self = this;

  data.sensors.forEach(function(s, i) {
    self._sensors = [];

    var sensor = Sensor(s.channel);
    self._sensors.push(sensor);

    sensor.start();

    sensor.on('temperatureChange', function(temp) {
      data.sensors[i].temperature = temp;

      gpioutil.write(24, temp < self.target, function(err) {
        if (err) throw err;

        data.fan = temp < self.target;
        data.date = new Date();

        self.emit('temperatureChange', data);
      });
    });
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

