/**
 * http://usejsdoc.org/
 */

'use strict';

var helmet = require('helmet');

module.exports = function (app) {
	app.use(helmet());
}
