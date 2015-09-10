module.exports = (function() {
  var Note = function(freq, duration) {
    return {
      freq: freq,
      duration: duration
    }
  };

  return Note
})();
