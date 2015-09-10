var interval = require("./interval");

module.exports = (function () {

  SCALES = {
    // 2 = whole step
    // 1 = half step
    major: [0, 2, 2, 1, 2, 2, 2, 1],
    minor: [0, 2, 1, 2, 2, 1, 2, 2]
  };

  var scale = function (rootNote, type) {
    if ( typeof rootNote === 'undefined' ) {
      rootNote = 'C';
    }

    if ( typeof type === 'undefined' ) {
      type = 'major';
    }

    var scaleIntervals = SCALES[type];

    var notes = [];
    var halfSteps = 0;

    for(var i = 0; i < scaleIntervals.length; i++) {
      halfSteps += scaleIntervals[i];
      notes.push(interval.getFreq(rootNote, halfSteps));
    }

    return {
      notes: notes,
      rootNote: rootNote,
      type: type,
      getHalfStepsBetween: function (idxOne, idxTwo) {
        var halfSteps = 0;
        for(var i = idxOne+1; i < idxTwo; i++) {
          halfSteps += scaleIntervals[i];
        }
        return halfSteps;
      }
    }
  };

  return scale;
})();
