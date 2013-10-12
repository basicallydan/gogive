var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(8080);

function sfy(d) {
	return JSON.stringify(d, null, 2);
}

app.use(express.static(__dirname + '/../client'));