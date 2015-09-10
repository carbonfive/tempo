var tessel = require('tessel');
var ambientlib = require('ambient-attx4');// Replace '../' with 'ambient-attx4' in your own code

var ambient = ambientlib.use(tessel.port.D);

ambient.on('ready', function () {
 // Get points of light and sound data.
  setInterval( function () {
    ambient.getLightLevel( function(err, ldata) {
      ambient.getSoundLevel( function(err, sdata) {
        console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
    });
  })}, 500); // The readings will happen every .5 seconds unless the trigger is hit

  ambient.setLightTrigger(0.5);

  // Set a light level trigger
  // The trigger is a float between 0 and 1
  ambient.on('light-trigger', function(data) {
    console.log("Our light trigger was hit:", data);

    // Clear the trigger so it stops firing
    ambient.clearLightTrigger();
    //After 1.5 seconds reset light trigger
    setTimeout(function () {

        ambient.setLightTrigger(0.5);

    },1500);
  });

  // Set a sound level trigger
  // The trigger is a float between 0 and 1
  ambient.setSoundTrigger(0.1);

  ambient.on('sound-trigger', function(data) {
    console.log("Something happened with sound: ", data);

    // Clear it
    ambient.clearSoundTrigger();

    //After 1.5 seconds reset sound trigger
    setTimeout(function () { 

        ambient.setSoundTrigger(0.1);

    },1500);

  });
});

ambient.on('error', function (err) {
  console.log(err)
});
