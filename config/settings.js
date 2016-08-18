/**
 * http://usejsdoc.org/
 */

'use strict';

var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : 8087,
  baudRate   : 9600,
  contentType: "application/json",
  tokens:{
    indico: '7568147abe46a48a4c6e4d5ac952af82',
    pubnub_client_key: '',
    pubnub_secret_key: ''
  },
  email:{
	  from_name: 'Bruno Beraldi',
	  reply_to: 'bberaldi@gdb.net'
  }
};

module.exports = settings;
