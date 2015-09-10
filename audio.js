var Pico = require("node-pico");

function samplesPerBeat(bpm, sampleRate) {
  return (sampleRate * 60) / bpm;
}

function duration(bpm, beats, sampleRate) {
  return Math.round(beats * samplesPerBeat(bpm, sampleRate));
}

function sinetone() {
  var temp = 60;
  var x1 = 0, y1 = (temp * 10) / Pico.sampleRate;
  var x2 = 0, y2 = (temp * 10 + 5) / Pico.sampleRate;

  var bpm = 120;
  var beats = 0.5;
  var noteOn = true;

  var remainder = 0;
  var volume = 0.25;

  return function(e) {
    var out = e.buffers;

    remainder = remainder ? remainder : duration(bpm, beats, Pico.sampleRate);

    if(e.bufferSize >= remainder) {
      remainder = 0;
      noteOn = !noteOn;
    }
    else {
      remainder -= e.bufferSize;
    }

    for (var i = 0; i < e.bufferSize; i++) {
      if(noteOn) {
        out[0][i] = Math.sin(2 * Math.PI * x1) * volume;
        out[1][i] = Math.sin(2 * Math.PI * x2) * volume;
        x1 += y1;
        x2 += y2;
      }
      else {
        out[0][i] = 0;
        out[1][i] = 0;
      }
    }
  };
}

Pico.play(sinetone());

