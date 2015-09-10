var Pico = require("node-pico");
var note = require("./notes");
var scale = require("./scale");
var Sequence = require("./sequence");

function samplesPerBeat(bpm, sampleRate) {
  return (sampleRate * 60) / bpm;
}

function duration(bpm, beats, sampleRate) {
  return Math.round(beats * samplesPerBeat(bpm, sampleRate));
}

function octaveShift(freq, octave) {
  while(octave > 1) {
    freq = freq * 2;
    octave -= 1;
  }
  return freq;
}

function forSampleRate(freq, sampleRate) {
  return freq / sampleRate;
}

function song() {
  var melody = [];
  var dMaj = scale("E", "major").notes;

  for(var i = 0; i < dMaj.length; i ++) {
    melody.push(octaveShift(dMaj[i], 4));
  }

  console.log(melody);

  var seq = new Sequence(melody);

  var x1 = 0, y1 = null;
  var x2 = 0, y2 = null;
  var detune = 30;

  var bpm = 120;
  var beats = 0.25;
  var noteOn = true;

  var remainder = 0;
  var volume = 0.25;

  var freq = 0;

  function setNextNote() {
    seq.next(function(noteFreq) {
      freq = noteFreq;
      var n = forSampleRate(noteFreq, Pico.sampleRate);
      y1 = n;
      y2 = n + detune;
    });
  }

  setNextNote();

  return function(e) {
    var left  = e.buffers[0];
    var right = e.buffers[1];

    remainder = remainder ? remainder : duration(bpm, beats, Pico.sampleRate);

    if(e.bufferSize >= remainder) {
      remainder = 0;
      noteOn = !noteOn;
      if(noteOn) {
        setNextNote();
      }
    }
    else {
      remainder -= e.bufferSize;
    }

    for (var i = 0; i < e.bufferSize; i++) {
      if(noteOn) {
        left[i] = Math.sin(2 * Math.PI * x1) * volume;
        right[i] = Math.sin(2 * Math.PI * x2) * volume;
      }
      else {
        left[i] = 0;
        right[i] = 0;
      }
      x1 += y1;
      x2 += y2;
    }
  };
}

Pico.play(song());
