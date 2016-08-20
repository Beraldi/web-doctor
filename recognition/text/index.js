var fs = require('fs.extra');
var indico = require('indico.io');

// Be sure to set your API key
indico.apiKey = "7568147abe46a48a4c6e4d5ac952af82";

var response = function(res) { console.log(res); };
var logError = function(err) { console.log(err); };

// single example
indico.emotion("I did it. I got into Grad School. Not just any program, but a GREAT program. :-)", language="pt")
  .then(response)
  .catch(logError);
