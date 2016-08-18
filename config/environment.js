/**
 * http://usejsdoc.org/
 */

'use strict';

var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs-extra');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var settings = require('./settings');


module.exports = function(app) {


    var logDirectory = path.resolve(__dirname + '/../log/');

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    // create a rotating write stream
    var accessLogStream = FileStreamRotator.getStream({
        date_format: 'YYYYMMDD',
        filename: path.join(logDirectory, 'access-%DATE%.log'),
        frequency: 'daily',
        verbose: false
    })

    // setup the logger
    app.use(morgan('combined', {
        stream: accessLogStream
    }))


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(methodOverride());
};
