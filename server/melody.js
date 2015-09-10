var Note = require("./note");
var interval = require("./interval");
var scale = require("./scale");

module.exports = (function() {

  function octaveShift(freq, octave) {
    while(octave > 1) {
      freq = freq * 2;
      octave -= 1;
    }
    return freq;
  }

  var getFrequency = function(songScale, degree) {
    var halfSteps = songScale.getHalfStepsBetween(0, degree);
    return interval.getFreq(rootNote, halfSteps);
  };

  var getFrequencies = function(song) {
    var frequencies = [];
    for(var i = 0; i < song.notes.length; i++) {
      var songScale = scale(song.key, "major");
      var baseFreq = getFrequency(songScale, song.notes[i]);
      frequencies.push(octaveShift(baseFreq, octave));
    }
  };

  var Melody = function(song, octave) {
    var frequencies = getFrequencies(song, octave);
    var notes = [];
    for (var i = 0; i < frequencies.length; i++) {
      notes.push({frequency: frequencies[i], duration: song.noteLengths[i]})
    }
    return {
      notes: notes
    }
  };

  return Melody;
})();
