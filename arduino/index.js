var settings = require('../config/settings');

// serial port initialization:
var serialport = require('serialport'), // include the serialport library			// make a local instance of serial
    portName = settings.arduino.portName || process.argv[2], // get the port name from the command line
    portConfig = {
        baudRate: settings.arduino.baudRate,
        // call myPort.on('data') when a newline is received:
        parser: serialport.parsers.readline('\n')
    };

function Arduino(){

    var myPort = new serialport(portName, portConfig);

    myPort.on('open', function() {
        console.log('port open. Data rate: ' + myPort.options.baudRate);
    });

    myPort.on('data', function(data) {
        console.log(data);
    });

    myPort.on('close', function() {
        console.log('port closed.');
    });

    myPort.on('error', function(error) {
        console.log('Serial port error: ' + error);
    });
}

module.exports = Arduino;
