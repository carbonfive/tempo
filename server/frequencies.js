module.exports = (function () {
  var FREQUENCIES = [
    16.35, // C
    17.32, // C#
    18.35, // D
    19.45, // D#
    20.60, // E
    21.83, // F
    23.12, // F#
    24.50, // G
    25.96, // G#
    27.50, // A
    29.14, // A#
    30.87  // B
  ];

  var NAME_MAP = [
    "C","Cs","D","Ds","E","F","Fs","G","Gs","A","As","B"
  ];

  return {
    frequencies: FREQUENCIES,
    noteNames: NAME_MAP,
    count: NAME_MAP.length,
    freq: function (noteName) {
      var idx = NAME_MAP.indexOf(noteName);
      if(idx >= 0) {
        return FREQUENCIES[idx]
      }
    }
  };
})();
