var settings = require('../config/settings');
// serial port initialization:
var serialport = require('serialport'),			// include the serialport library
	SerialPort  = serialport.SerialPort,			// make a local instance of serial
	portName = settings.port,								// get the port name from the command line
	portConfig = {
		baudRate: settings.baudRate,
		// call myPort.on('data') when a newline is received:
		parser: serialport.parsers.readline('\n')
	};

   // open the serial port:
var myPort = new SerialPort(portName, portConfig);

// myPort.on('open', showPortOpen);
// myPort.on('data', sendSerialData);
// myPort.on('close', showPortClose);
// myPort.on('error', showError);
//
//
// function showPortOpen() {
//    console.log('port open. Data rate: ' + myPort.options.baudRate);
//    setInterval(function(){
//       myPort.write('x');
//       console.log("enviado...");
//    }, 1000);
// }
//
// function sendSerialData(data) {
//    console.log(data);
// }
//
// function showPortClose() {
//    console.log('port closed.');
// }
//
// function showError(error) {
//    console.log('Serial port error: ' + error);
// }
