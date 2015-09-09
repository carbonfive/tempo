var Pico = require("node-pico");

function samplesPerBeat(bpm, sampleRate) {
  return (sampleRate * 60) / bpm;
}

function duration(bpm, beats, sampleRate) {
  return Math.round(beats * samplesPerBeat(bpm, sampleRate));
}

function sinetone() {
  var temp = 60;
  var x1 = 0, y1 = temp * 10 / Pico.sampleRate;
  var x2 = 0, y2 = temp * 10 + 5 / Pico.sampleRate;
  var remainder = 0;
  var noteOn = true;

  var bpm = 120;
  var beats = 1;

  return function(e) {
    var out = e.buffers;

    remainder = remainder ? remainder : duration(bpm, beats, Pico.sampleRate);

    var loopUntil = e.bufferSize;

    if(e.bufferSize > remainder) {
      loopUntil = remainder;
      remainder = 0;
      noteOn = !noteOn;
    }
    else {
      loopUntil = e.bufferSize;
      remainder -= e.bufferSize;
    }

    for (var i = 0; i < loopUntil; i++) {
      console.log(noteOn, loopUntil, remainder);
      if(noteOn) {
        out[0][i] = Math.sin(2 * Math.PI * x1) * 0.25;
        out[1][i] = Math.sin(2 * Math.PI * x2) * 0.25;
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

