module.exports = (function() {
  function Sequence(noteSeq) {
    var notes = [];
    var step = 0;

    if (typeof noteSeq !== 'undefined') {
      notes = noteSeq;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function incrementStep() {
      if( step === notes.length - 1) {
        step = 0;
      }
      else {
        step += 1;
      }
    }

    return {
      next: function(callback) {
        callback(notes[step]);
        incrementStep();
      },
      random: function(callback) {
        step = getRandomInt(0, notes.length-1);
        callback(notes[step]);
      }
    }
  }

  return Sequence
})();
