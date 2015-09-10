var tessel = require('tessel');
var climatelib = require('climate-si7020');

var climate = climatelib.use(tessel.port.C);

climate.on('ready', function () {
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      if (err) {
        console.log(err);
      } else {
        climate.readHumidity(function (err, humid) {
          if (err) {
            console.log(err);
          } else {
            console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');
            postData.climate.push({t: temp.toFixed(4), h: humid.toFixed(4)});
            setTimeout(loop, 300);
          }
        });
      }
    });
  });
});

setInterval(function() {
  postData = {climate: []};
}, 5 * 1000);
