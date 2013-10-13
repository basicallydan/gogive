var mongoose = require('mongoose');
var Schema = mongoose.Schema;

Array.prototype.removeValue = function (val) {
	var index = this.indexOf(val);

	if (index > -1) {
		this.splice(index, 1);
	}
};

Array.prototype.addValue = function (val) {
	var index = this.indexOf(val);

	if (index === -1) {
		this.push(val);
	}
};

var PlaceSchema = new Schema({
	name: String,
	address: String,
	latLng: { type: [ Number ], index: '2dsphere', required: true },
	needs: [ String ],
	urgency: {
		type: {
			seeking: { type: [ String ], default: []},
			emergency: { type: [ String ], default: []}
		}
	},
	telephone: String,
	email: String,
	paypalEmail: String,
	phoneSubscribers: [ String ],
	description: String,
	website: String,
	publicId: String
});

PlaceSchema.methods.setUrgencyOfNeed = function (need, urgency) {
	if (!this.urgency) {
		this.urgency = {
			seeking: [],
			emergency: []
		};
	}

	if (!this.urgency.seeking) {
		this.urgency.seeking = [];
	}
	if (!this.urgency.emergency) {
		this.urgency.emergency = [];
	}

	console.log('Setting ' + need + ' to ' + urgency);

	// Remove from all arrays
	this.urgency.seeking.removeValue(need);
	this.urgency.emergency.removeValue(need);

	// Add to the appropriate array
	if (urgency !== 'normal') {
		this.urgency[urgency].addValue(need);
	}

	// Ensure it's on the main list
	this.needs.addValue(need);
};

PlaceSchema.methods.hasNeedWithUrgency = function(need, urgency) {
	if (!this.urgency || !this.urgency[urgency]) return false;

	return this.urgency[urgency].indexOf(need) !== -1;
};

PlaceSchema.methods.getNeedsAsObjects = function () {
	var needs = [];
	for (var i = this.needs.length - 1; i >= 0; i--) {
		if (this.hasNeedWithUrgency(this.needs[i], 'emergency')) {
			needs[i] = { description: this.needs[i], urgency: 'emergency' };
		} else if (this.hasNeedWithUrgency(this.needs[i], 'seeking')) {
			needs[i] = { description: this.needs[i], urgency: 'seeking' };
		} else {
			needs[i] = { description: this.needs[i], urgency: 'normal' };
		}
	}
	return needs;
};

var Place = mongoose.model('Place', PlaceSchema);

module.exports = mongoose;