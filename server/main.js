var express = require('express');
var app = express();
var server = require('http').createServer(app);
var mongoose = require('./models');
mongoose.connect('mongodb://localhost/gogive');
var Place = mongoose.model('Place');

server.listen(8080);

function sfy(d) {
	return JSON.stringify(d, null, 2);
}

app.configure(function(){
	app.use(express.static(__dirname + '/../client'));
	app.use(express.bodyParser());
	app.use(express.cookieParser());
});

app.get('/places', logRequest, function (req, res) {
	var search = {};

	if (req.query.offer) {
		search.needs = req.query.offer.toLowerCase();
	}

	var query = Place.find(search);
	var promise = query.exec();
	promise.addBack(function (err, docs) {
		if (err) {
			return res.send(500, err);
		}

		return res.send(200, docs);
	});
});

app.post('/places', logRequest, function (req, res) {
	var org = new Place({
		name: req.body.title,
		address: req.body.address,
		latLng: req.body.latLng,
		needs: req.body.needs,
		telephone: req.body.telephone,
		email: req.body.email,
		paypalEmail: req.body.paypalEmail
	});

	org.save(function (err) {
		if (err) {
			return res.send(500);
		}

		return res.send(201);
	});
});

function logRequest(req, res, next) {
	console.log(req.method + ' request to ' + req.url);
}