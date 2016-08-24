var fs = require('fs.extra');
var path = require('path');
var express = require("express");
var colors = require('colors');
var io = require('socket.io');
var settings = require('./config/settings');
var environment = require('./config/environment');
var security = require('./config/security');
var routes = require("./config/routes");

module.exports.start = function(done) {
    var app = express();
    var router = express.Router();

    app.use(express.static('ui'));

    security(app);

    environment(app);

    routes(app, router);

    var server = app.listen(settings.port, function() {
        console.log(("Listening on port ..." + server.address().port).green);

        if (done) {
            return done(null, app, server); // If someone ran: "node server.js" then automatically start the server
            if (path.basename(process.argv[1], '.js') == path.basename(__filename, '.js')) {
                module.exports.start()
            }
        }
    }).on('error', function(e) {
        if (e.code == 'EADDRINUSE') {
            console.log('Address in use. Is the server already running?'.red);
        }
        if (done) {
            return done(e);
        }
    });

    // var socketServer = io(server);
    //
    // socketServer.on('connection', function(socket) {
    //     console.log('new user address: ' + socket.handshake.address);
    //     // send something to the web client with the data:
    //     socket.emit('message', 'Hello, ' + socket.handshake.address);
    //
    //     // this function runs if there's input from the client:
    //     socket.on('message', function(data) {
    //         myPort.write(data); // send the data to the serial device
    //     });
    //
    //     // this function runs if there's input from the serialport:
    //     myPort.on('data', function(data) {
    //         socket.emit('message', data); // send the data to the client
    //     });
    // });
}

//If someone ran: "node server.js" then automatically start the server
if (path.basename(process.argv[1], '.js') == path.basename(__filename, '.js')) {
    module.exports.start()
}
