var Pico = require("node-pico");
var scale = require("./scale");
var interval = require("./interval");
var Sequence = require("./sequence");
var data = require("./data");

function samplesPerBeat(bpm, sampleRate) {
  return (sampleRate * 60) / bpm;
}

function duration(bpm, beats, sampleRate) {
  return Math.round(beats * samplesPerBeat(bpm, sampleRate));
}

function forSampleRate(freq, sampleRate) {
  return freq / sampleRate;
}

function song() {
  var melody = [];
  var dMaj = scale("E", "major").notes;

  for(var i = 0; i < dMaj.length; i ++) {
    melody.push(interval.octaveShift(dMaj[i], 4));
  }

  var seq = new Sequence(melody);

  var x1 = 0, y1 = null;
  var x2 = 0, y2 = null;
  var detune = 30;

  var bpm = null;
  var beats = 0.25;
  var noteOn = false;

  var remainder = 0;
  var volume = 0.25;

  var freq = 0;

  data.registerListener(function(reading) {
    console.log({id: reading.id, bpm: bpm});
    bpm = reading.temperature;
  });

  function setNextNote(method) {
    if ( typeof method === 'undefined' ) {
      method = 'next';
    }
    seq[method](function(noteFreq) {
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

    if( bpm ) {
      remainder = remainder ? remainder : duration(bpm, beats, Pico.sampleRate);

      if (e.bufferSize >= remainder) {
        remainder = 0;
        noteOn = !noteOn;
        if (noteOn) {
          setNextNote('random');
        }
      }
      else {
        remainder -= e.bufferSize;
      }
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
