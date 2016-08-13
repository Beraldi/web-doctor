var clmtrackr = require('clmtrackr');
var model_pca_20_svm_emotionDetection = require('./js/model_pca_20_svm_emotionDetection.js');
var emotion_classifier = require('./js/emotion_classifier.js');
var emotionmodel = require('./js/emotionmodel.js');
var indico = require('indico.io');
var fs = require('fs.extra');
var ps = require('pocketsphinx').ps;
var PubNub = require('pubnub');

// Be sure to set your API key
indico.apiKey = "7568147abe46a48a4c6e4d5ac952af82";

var response = function(res) { console.log(res); }
var logError = function(err) { console.log(err); }

// single example
indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)", language="pt")
  .then(response)
  .catch(logError);

modeldir = "../../pocketsphinx/model/en-us/";

var config = new ps.Decoder.defaultConfig();
config.setString("-hmm", modeldir + "en-us");
config.setString("-dict", modeldir + "cmudict-en-us.dict");
config.setString("-lm", modeldir + "en-us.lm.bin");
var decoder = new ps.Decoder(config);

fs.readFile("../../pocketsphinx/test/data/goforward.raw", function(err, data) {
    if (err) throw err;
    decoder.startUtt();
    decoder.processRaw(data, false, false);
    decoder.endUtt();
    console.log(decoder.hyp())
});
