'use strict';

var path = require('path');
var settings = require('./settings');
var bunyan = require('bunyan');
var RotatingFileStream = require('bunyan-rotating-file-stream');
var strformat = require('strformat');
var logDirectory = path.resolve(__dirname + '/../log/');
//var arduino = require('../arduino/index');
var serialport = require('serialport'),
    portName = settings.arduino.portName || process.argv[2],
    portConfig = {
        baudRate: settings.arduino.baudRate,
        // call myPort.on('data') when a newline is received:
        parser: serialport.parsers.readline('\n')
    };

var log = bunyan.createLogger({
    name: 'Accounts managment Auth0 API',
    level: 'error',
    streams: [{
        type: 'raw',
        stream: new RotatingFileStream({
            path: logDirectory + '/error-%Y%m%d.log',
            period: '1d', // daily rotation
            totalFiles: 10, // keep up to 10 back copies
            rotateExisting: true, // Give ourselves a clean file when we start up, based on period
            threshold: '5m', // Rotate log files larger than 5 megabytes
            totalSize: '10m', // Don't keep more than 10mb of archived log files
            gzip: true // Compress the archive log files to save space
        })
    }]
});

function showError(send, err) {
    send["statusCode"] = err.statusCode || 500;
    delete err.statusCode;
    send["error"] = err;
    return send;
}

var appRouter = function(app, router) {

    var interval = 0;

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

    router.use(function(err, req, res, next) {
        // Do logging and user-friendly error message display
        if (err) {
            console.error(err);
            res.status(500).send('internal server error');
        }

        console.log("/" + req.method);

        log.info("/" + req.method);
        
        next();
    });

    router.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + '/ui/index.html'));
    });

    app.get("/webdoctor/goto/:direction", function(req, res) {

        var direction = req.params.direction.toString();

        clearInterval(interval);

        interval = setInterval(function() {
            myPort.write(direction);
            console.log("Enviado commando: " + direction);
        }, 1000);

        console.log(direction);

        res.sendStatus(200);

    });

    app.get("/webdoctor/stop", function(req, res) {

        clearInterval(interval);

        myPort.write('p');

        console.log("Enviado commando: p");

        res.sendStatus(200);

    });

    app.use("*", function(req, res) {
        res.status(404).send("Oh uh, something went wrong");
    });

}

module.exports = appRouter;
