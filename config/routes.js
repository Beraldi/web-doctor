'use strict';

var path = require('path');
var settings = require('./settings');
var bunyan = require('bunyan');
var RotatingFileStream = require('bunyan-rotating-file-stream');
var strformat = require('strformat');
var logDirectory = path.resolve(__dirname + '/../log/');
var arduino = require('../arduino/index');

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

    router.use(function(req, res, next) {
        console.log("/" + req.method);
        log.info("/" + req.method);
        next();
    });

    router.get("/", function(req, res) {
        console.log("myPort", myPort);
        res.status(200);
    });

    //delete an user
    app.delete("/webdoctor/goto/:direction", function(req, res) {

        var direction = req.params.id.toString();

        alert(direction);

    });

    app.use("*", function(req, res) {
        res.status(404).send("Oh uh, something went wrong");
    });

}

module.exports = appRouter;
