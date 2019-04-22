'use strict';

var express = require('express');
var http = require('http');

var routes = require('./routes/index');

var app = (module.exports.app = exports.app = express());

var NODE_PORT = process.env.NODE_PORT || 4000;
var NODE_ENV = process.env.NODE_ENV || 'development';

app.use(routes);

var server = http.createServer(app);
server.listen(NODE_PORT, function () {
	console.log('server running on %s mode on port %d', NODE_ENV, NODE_PORT);
});

module.exports = app;