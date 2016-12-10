var mcpadc = require('mcp-spi-adc');
var gpioutil = require('pi-gpioutil');

var tempSensor = mcpadc.open(0, {speedHz: 20000}, function (err) {
  if (err) throw err;

  setInterval(function () {
    tempSensor.read(function (err, reading) {
			if (err) throw err;

      var temp = (reading.value * 3.3 - 0.5) * 100;
			console.log(temp);

      gpioutil.write(24, temp < 20.0, function(err) {
        if (err) throw err;
      });
		});
	}, 1000);
});
