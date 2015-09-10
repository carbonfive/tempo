var note = require("./notes");

module.exports = (function() {
  var interval = function() {

    var noteIdx = function(noteName) {
      return note.noteNames.indexOf(noteName);
    };

    var octaveDifference = function(rootIndex, halfSteps) {
      return Math.floor((rootIndex + halfSteps) / note.count);
    };

    function octaveShift(freq, octave) {
      while (octave > 0) {
        freq = freq * 2;
        octave -= 1;
      }
      while (octave < 0) {
        freq = freq / 2;
        octave += 1;
      }
      return freq;
    }

    return {
      octaveShift: octaveShift,
      getFreq: function(noteName, halfSteps) {
        var freqIndex = null;
        var rootIdx = noteIdx(noteName);
        var octaveChange = octaveDifference(rootIdx, halfSteps);
        if ( octaveChange === 0 ) {
          freqIndex = rootIdx + halfSteps;
        }
        else {
          freqIndex = (rootIdx + halfSteps) % note.count;
        }
        return octaveShift(note.frequencies[freqIndex], octaveChange);
      }
    }
  };

  return interval();
})();
