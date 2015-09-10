module.exports = (function() {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function climateService() {
    var interval = 300;
    var rangeMin = 55;
    var rangeMax = 110;
    var temperature = getRandomInt(rangeMin, rangeMax);
    var running = false;

    function randomTempChange(currentTemperature, minRange, maxRange) {
      delta = getRandomInt(minRange / 100, maxRange / 100);
      if(getRandomInt(0,1)) {
        return currentTemperature += delta
      }
      else {
        return currentTemperature -= delta
      }
    }

    function run() {
      if(running) {
        temperature = randomTempChange(temperature, rangeMin, rangeMax);
        setTimeout(function () { run() }, interval);
      }
    }

    return {
      setRange: function(min, max) {
        rangeMin = min;
        rangeMax = max;
      },
      setInterval: function(newInterval) {
        interval = newInterval
      },
      getTemp: function() {
        return temperature;
      },
      start: function(changeInterval) {
        if(typeof interval !== 'undefined') {
          interval = changeInterval;
        }
        running = true;
        run();
      },
      stop: function() {
        running = false;
      }
    }
  }

  return climateService();
})();
