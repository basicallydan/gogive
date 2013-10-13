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

function getGeocodedAddress(place, index, count) {
	console.log('Geocoding ' + place.name + ' in ' + ((500 * index) / 1000) + ' seconds');
	function save() {
		place.save(function() {
			checkIfDone();
		});
	}
	if (place.address && count > 0) {
		setTimeout(function () {
			var address = place.address;
			if (address.search(/UK$/i) === -1) {
				address += ', UK';
			}
			address = encodeURIComponent(address);
			var requestURI = '/maps/api/geocode/json?address=' + address + '&sensor=false';
			console.log(new Date() + ': Making request to ' +requestURI);
			client.get(requestURI, function(err, res, body) {
				if ((body.status && body.status !== 'OK') || !body.results || body.results.length === 0) {
					console.log('Retrying ' + requestURI);
					return getGeocodedAddress(place, index, count - 1);
				}

				if (body.results && body.results[0] && body.results[0].geometry) {
					place.location = [body.results[0].geometry.location.lat, body.results[0].geometry.location.lng];
					return save();
				}

				console.log('Retrying ' + requestURI);
				return getGeocodedAddress(place, index, count - 1);
			});
		}, 500 * index);
	} else {
		place.location = [51.5072, 0.1275];
		save();
	}
}

promise.addBack(function (err, places) {
	if (err) {
		return res.send(500, err);
	}

	// totalPlaces = places.length;
	totalPlaces = 2;

	places.forEach(function (place, i) {
		getGeocodedAddress(place, i, 3);
	});
});