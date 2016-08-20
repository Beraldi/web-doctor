/**
 * http://usejsdoc.org/
 */

'use strict';

var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : 8087,
  arduino: {
      baudRate  : 9600,
      portName  : "/dev/ttyACM0"
  },
  contentType: "application/json",
  tokens:{
    indico: '7568147abe46a48a4c6e4d5ac952af82',
    pubnub: {
      pub_key: "pub-c-296782a4-c6bb-4065-994b-d5e121308dc6",
      sub_key: "sub-c-2bdddca0-601d-11e6-ada4-02ee2ddab7fe"
    }
  },
  email:{
	  from_name: 'Bruno Beraldi',
	  reply_to: 'bberaldi@gdb.net'
  }
};

module.exports = settings;
