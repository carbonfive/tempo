module.exports = (function() {
  function Sequence(noteSeq) {
    var notes = [];
    var step = 0;

    if (typeof noteSeq !== 'undefined') {
      notes = noteSeq;
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
      }
    }
  }

  return Sequence
})();
