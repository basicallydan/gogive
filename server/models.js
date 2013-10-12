var mongoose = require('mongoose');

var Place = mongoose.model('Place', {
	name: String,
	address: String,
	latLng: { type: [ Number ], index: '2dsphere', required: true },
	needs: [ String ],
	telephone: String,
	email: String,
	paypalEmail: String
});

module.exports = mongoose;