var tessel = require('tessel');

// modules
var accelerometer = require("accel-mma84").use(tessel.port.A);
var infrared = require("ir-attx4").use(tessel.port.B);
var climate = require("climate-si7020").use(tessel.port.C);
var ambient = require("ambient-attx4").use(tessel.port.D);

var wifi = require("./lib/wifi.js");

var postData = {climate: []};

climate.on("ready", function() {
  setImmediate(function loop () {
    climate.readTemperature('f', function (e1, temp) {
      if (e1) { console.log(e1); return; }
      climate.readHumidity(function (e2, humid) {
        if (e2) { console.log(e2); return; }
        var climateData = {
          temperature: temp.toFixed(4),
          humidity: humid.toFixed(4)
        };
        console.log('Degrees:', climateData.temperature, 'Humidity:', climateData.humidity);
        postData.climate.push(climateData);
        setTimeout(loop, 300);
      });
    });
  });
});

wifi.onConnect = function() {
  setInterval(function() {
    console.log("post data");
    // post data to endpoint
    postData = {climate: []};
  }, 5 * 1000);
};
