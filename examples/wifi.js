var wifi = require("wifi-cc3000");
var network = "Carbon Five Guest";
var password = "NOT-THE-PASSWORD";
var security = "wpa2";
var timeouts = 0;

function connect() {
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

wifi.on("connect", function(data) { console.log("connect emitted:", data); });
wifi.on("disconnect", function(data) { console.log("disconnect emitted:", data); });
wifi.on("timeout", function(err) {
  console.log("timeout emitted:", err);
  timeouts++;
  if (timeouts > 2) {
    powerCycle();
  } else {
    connect();
  }
});

wifi.on("error", function(err) {
  console.log("error emitted:", err);
});

console.log("begin attempting to connect");
connect();
