var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');

var Place = mongoose.model('Place', {
	name: String,
	address: String,
	latLng: { type: [ Number ], index: '2dsphere', required: true },
	needs: [ String ],
	telephone: String,
	email: String,
	paypalEmail: String
});

module.export = {
	Place: Place
};