var numberOfCharities = 10;
var config = require('./config/config.json');
var mongoose = require('./server/models');
mongoose.connect(config.mongoConnectionString);
var Place = mongoose.model('Place');

var query = Place.find();
var promise = query.exec();

var request = require('request-json');
var client = request.newClient('https://maps.googleapis.com');

var totalPlaces = 0;

function checkIfDone() {
	done++;
	if (done === totalPlaces) {
		console.log('Done with ' + done + ' places out of ' + totalPlaces);
	}
}

function getGeocodedAddress(place) {
	function save() {
		place.save(function() {
			checkIfDone();
		});
	}
	if (place.address) {
		client.get('/maps/api/geocode/json?address=14+langdon+court,+EC1V+1LH&sensor=false', function(err, res, body) {
			return console.log(res.body);
		});
	} else {
		place.location = [51.5072, 0.1275];
	}
}

promise.addBack(function (err, places) {
	if (err) {
		return res.send(500, err);
	}

	// totalPlaces = places.length;
	totalPlaces = 2;

	places.forEach(function (place, i) {
		getGeocodedAddress(place);
	});
});