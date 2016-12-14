var inherits = require('util').inherits;
var EventEmitter = require('events').EventEmitter;
var mcpadc = require('mcp-spi-adc');

module.exports = Sensor;

function Sensor(channel) {
  if (!(this instanceof Sensor)) return new Sensor(channel);

  this._channel = channel;

  EventEmitter.call(this);
}

inherits(Sensor, EventEmitter);

Sensor.prototype.start = function start() {
  var self = this;

  var data;

  self._tempSensor = mcpadc.open(self._channel, {speedHz: 20000}, function (err) {
    if (err) throw err;

    self._interval = setInterval(function () {
      self._tempSensor.read(function (err, reading) {
        if (err) throw err;

        var temp = Math.round((reading.value * 3.3 - 0.5) * 100);

        if (temp != data) {
          data = temp;
          self.emit('temperatureChange', data);
        }
      });
    }, 1000);
  });
};

Sensor.prototype.stop = function stop() {
  clearInterval(this._interval);
};

