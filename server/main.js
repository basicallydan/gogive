var express = require('express');
var app = express();
var server = require('http').createServer(app);
var config = require('../config/config.json');
var mongoose = require('./models');
mongoose.connect(config.mongoConnectionString);
var Place = mongoose.model('Place');
var path = require('path');
var twilio = require('twilio');
var applicationRoot = __dirname;
var clientPath = path.join(applicationRoot, '/../client');
var indexPath = path.join(applicationRoot, '/../client/index.html');
 
// Create a new REST API client to make authenticated requests against the
// twilio back end
var twilioClient = new twilio.RestClient(config.twilioSID, config.twilioAuthToken);
server.listen(8080);

function sfy(d) {
	return JSON.stringify(d, null, 2);
}

app.configure(function(){
	// Middleware for static file requests
	app.use('/assets', express.static(path.join(clientPath, '/assets')));

	// Middleware for API requests
	app.use('/api', express.bodyParser());
	app.use(express.cookieParser());
});

app.get('/api/places', logRequest, function (req, res) {
	var search = {};

	if (req.query.needs) {
		search.needs = req.query.needs.toLowerCase().split(',');
	}

	if (req.query.location) {
		var locationParts = req.query.location.split(',');
		var circle = [ [locationParts[0], locationParts[1]], locationParts[2] ];
		search.latLng = { $within :
			{ $center :  circle}
		};
	}

	console.log('Searching for: ' + JSON.stringify(search));

	var query = Place.find(search);
	var promise = query.exec();
	promise.addBack(function (err, docs) {
		if (err) {
			return res.send(500, err);
		}

		return res.send(200, docs);
	});
});

app.post('/api/places', logRequest, function (req, res) {
	var place = new Place({
		name: req.body.title,
		address: req.body.address,
		latLng: req.body.latLng,
		needs: req.body.needs,
		telephone: req.body.telephone,
		email: req.body.email,
		paypalEmail: req.body.paypalEmail,
		description: req.body.description,
		website: req.body.website
	});

	place.save(function (err) {
		if (err) {
			return res.send(500);
		}

		return res.send(201);
	});
});

// Fuck this
app.post('/api/places/:id/subscribe', logRequest, function (req, res) {
	var phoneNumber = req.body.number;
	var query = Place.findById(req.params.id);
	var promise = query.exec();
	promise.addBack(function (err, docs) {
		if (err) {
			return res.send(500, err);
		}

		return res.send(201);
	});
});

// This is the one that Twilio hits
app.post('/api/twilio-subscription/places', logRequest, function (req, res) {
	console.log('The FUCKING BODY IS ' + JSON.stringify(req.body));
	var phoneNumber = req.body.From;
	var publicId = req.body.Body;
	var placeQuery = Place.find({ publicId : publicId });
	var promise = placeQuery.exec();
	promise.addBack(function (err, places) {
		if (err) {
			return res.send(500, err);
		}

		if (places.length === 0) {
			return res.send(404, { message: 'Could not find a place with the name ' + publicId });
		}

		console.log('Found lots of places: ' + JSON.stringify(places, null, 4));

		console.log('Subscribing ' + phoneNumber + ' to ' + publicId);

		places[0].phoneSubscribers.push(phoneNumber);

		places[0].save(function (err) {
			if (err) {
				return res.send(500);
			}
			return res.send(201);
		});
	});
});

function sendNotificationOnBehalfOfPlace(place, number, cb) {
	// Pass in parameters to the REST API using an object literal notation. The
	// REST client will handle authentication and response serialzation for you.
	console.log('Messaging ' + number + ' about ' + JSON.stringify(place, null, 4));
	twilioClient.sms.messages.create({
		to: number,
		from: '+44 1443 606412',
		body: 'Hey! ' + place.name + ' really needs some of this stuff: ' + place.needs.join(',')
	}, cb);
}

app.post('/api/places/:id/notification', logRequest, function (req, res) {
	var placeQuery = Place.findById(req.params.id);
	var promise = placeQuery.exec();
	promise.addBack(function (err, place) {
		console.log(place);
		for (var i = place.phoneSubscribers.length - 1; i >= 0; i--) {
			sendNotificationOnBehalfOfPlace(place, place.phoneSubscribers[i], function(error, message) {
				// The HTTP request to Twilio will run asynchronously. This callback
				// function will be called when a response is received from Twilio
				// The "error" variable will contain error information, if any.
				// If the request was successful, this value will be "falsy"
				if (!error) {
					// The second argument to the callback will contain the information
					// sent back by Twilio for the request. In this case, it is the
					// information about the text messsage you just sent:
					console.log('Success! The SID for this SMS message is:');
					console.log(message.sid);
					 
					console.log('Message sent on:');
					console.log(message.dateCreated);

					res.send(201);
				} else {
					console.log('Oops! There was an error. ', error);
					res.send(400);
				}
			});
		}
	});
});

// For non-API requests
app.get('/*', logRequest, function (req, res) {
	//res.send("What up");
	res.sendfile(path.join(clientPath, '/index.html'));
});

function logRequest(req, res, next) {
	console.log(req.method + ' request to ' + req.url);
	next();
}