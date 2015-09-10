var wifi = require("wifi-cc3000");

var timeouts = 0;

wifi.on("connect", function() {
  if (wifi.onConnect) { wifi.onConnect(); }
});

function connect() {
  var network = "Carbon Five Guest";
  var password = "CHANGE ME";
  var security = "wpa2";
  wifi.connect({security: security, ssid: network, password: password, timeout: 30});
}

function powerCycle(){
  wifi.reset(function() {
    timeouts = 0;
    console.log("done power cycling");
    setTimeout(function() {
      if (!wifi.isConnected()) {
        connect();
      }
    }, 20 * 1000);
  });
}

wifi.on("timeout", function(err) {
  console.log("timeout emitted:", err);
  timeouts++;
  if (timeouts > 2) {
    powerCycle();
  } else {
    connect();
  }
});

connect();

module.exports = wifi;
