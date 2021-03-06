var request = require("request");

module.exports = (function() {
  var server = {
    ip: "10.4.8.75",
    port: 4000,
    path: "/api/data"
  };

  var listeners = [];
  var pollingInterval = 1000;
  var polling = true;

  var uri = function() {
    return "http://" + server.ip + ":" + server.port + server.path
  };

  var notifyListeners = function(data) {
    for(var i = 0; i < listeners.length; i++) {
      listeners[i](JSON.parse(data));
    }
  };

  var poll = function() {
    request({
        method: 'GET',
        uri: uri()
      }
      , function (error, response, body) {
        console.log(error);
        console.log(response);
        notifyListeners(body);
      }
    )
  };

  var run = function() {
    if( polling ) {
      poll();
      setTimeout(function() { run(); }, pollingInterval);
    }
  };

  run();

  return {
    isAvailable: function() {

    },
    registerListener: function(listener) {
      listeners.push(listener);
    },
    start: function() {
      polling = true;
      run();
    },
    stop: function() {
      polling = false;
    }
  }
})();
