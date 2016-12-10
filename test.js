var async = require('async');
var Gpio = require('pigpio').Gpio;
var wpi = require('wiring-pi');
var gpioUtil = require('pi-gpioutil');

wpi.setup('sys');

var pins = [...Array(28).keys()];

async.every(pins, function(pin, callback) {
  gpioUtil.export(pin, 'in', function(err) {
    if (!err) {
      gpioUtil.mode(pin, 'tri', function (err) {
        callback(null, !err)
      });
    }
  });
}, function(err, result) {
  pins.forEach(function(pin) {
    console.log('GPIO ' + pin + ' : mode=' + wpi.getAlt(pin) + ' level=' + wpi.digitalRead(pin));
  });
//  for (gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
//	  console.log('GPIO ' + gpioNo + ' : mode=' + wpi.getAlt(gpioNo) + ' level=' + wpi.digitalRead(gpioNo));
//  }
});

//var Gpio = require('pigpio').Gpio,
//	  gpio,
//	  gpioNo;
//
//for (gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
//	  gpio = new Gpio(gpioNo);
//
//	  console.log('GPIO ' + gpioNo + ':' +
//		      ' mode=' + gpio.getMode() +
//			      ' level=' + gpio.digitalRead()
//		    );
//}

//var mcpadc = require('mcp-spi-adc');
//
//var tempSensor = mcpadc.open(5, {speedHz: 20000}, function (err) {
//	  if (err) throw err;
//
//	  setInterval(function () {
//		      tempSensor.read(function (err, reading) {
//			            if (err) throw err;
//
//			            console.log((reading.value * 3.3 - 0.5) * 100);
//			          });
//		    }, 1000);
//});
