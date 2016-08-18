var fs = require('fs.extra');
var express = require('express');		// include express.js
	io = require('socket.io'),				// include socket.io
	app = express(),									// make an instance of express.js
 	server = app.listen(8087),				// start a server with the express instance
	socketServer = io(server);
