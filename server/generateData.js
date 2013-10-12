var numberOfCharities = 10;
var possibleNeeds = ['food', 'time', 'blood', 'money', 'books', 'furniture', 'clothes'];
var config = require('../config/config.json');
var mongoose = require('./models');
mongoose.connect(config.mongoConnectionString);
var Place = mongoose.model('Place');
var done = 0;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomNeeds() {
	var numberOfNeeds = getRandomInt(1, 3);
	var needs = [];
	var chosenNeed;
	var randomIntChosen;
	for (var i = 0; i < numberOfNeeds; i++) {
		while (!chosenNeed || needs.indexOf(chosenNeed) !== -1) {
			randomIntChosen = getRandomInt(0, possibleNeeds.length - 1);
			console.log('Getting possible need: ' + randomIntChosen);
			chosenNeed = possibleNeeds[randomIntChosen];
			console.log('Chosen need is: ' + chosenNeed);
			console.log('Putting it into ' + JSON.stringify(needs));
		}
		needs.push(chosenNeed);
	}
	return needs;
}

var blood = require('../dat0r/blood.json');
var volunteering = require('../dat0r/volunteering.json');
var shelters = require('../dat0r/homelessuk.json');
var oxfam = require('../dat0r/oxfam.json');

function checkIfDone() {
	done++;
	if (done === blood.places.length + volunteering.places.length + shelters.places.length + oxfam.places.length) {
		console.log('SORTED!');
	}
}

for (var i = blood.places.length - 1; i >= 0; i--) {
	var placedata = blood.places[i];
	if (!placedata.telephone) {
		placedata.telephone = '02074 381913';
	}
	if (!placedata.email) {
		placedata.email = placedata.name.replace(/[^A-Za-z0-9]/g,'') + '@blood.org.uk';
	}
	if (!placedata.website) {
		placedata.website = 'http://www.blood.org.uk/' + placedata.name.replace(/[^A-Za-z0-9]/g,'');
	}
	if (!placedata.description) {
		placedata.description = placedata.name + " is a center for donating blood. We are looking for all bloodtypes";
	}
	placedata.latLng = [0,0];

	placedata.publicId = 'blood' + i;

	placedata.needs = ['blood'];
	var newplace = new Place(placedata);
	newplace.save(function (err) {
		if (err) {
			console.log('Ohshi! ', err);
		}

		console.log('Good stuff!');

		checkIfDone();
	});
}

for (var i = volunteering.places.length - 1; i >= 0; i--) {
	var placedata = volunteering.places[i];
	if (!placedata.telephone) {
		placedata.telephone = '02064 281613';
	}
	if (!placedata.email) {
		placedata.email = placedata.name.replace(/[^A-Za-z0-9]/g,'') + '@do-it.org.uk';
	}
	if (!placedata.website) {
		placedata.website = 'http://www.do-it.org.uk/' + placedata.name.replace(/[^A-Za-z0-9]/g,'');
	}
	if (!placedata.description) {
		placedata.description = placedata.name + " is a charity looking for volunteers of all ability levels to help with our projects.";
	}
	placedata.latLng = [0,0];

	placedata.publicId = 'volun' + i;

	placedata.needs = ['time'];
	var newplace = new Place(placedata);
	newplace.save(function (err) {
		if (err) {
			console.log('Ohshi! ', err);
		}

		console.log('Good stuff!');

		checkIfDone();
	});
}

for (var i = shelters.places.length - 1; i >= 0; i--) {
	var placedata = shelters.places[i];

	if (placedata.name) {
		placedata.name = placedata.name[0];
	}

	if (placedata.address) {
		placedata.address = placedata.address[0];
	}

	if (!placedata.telephone) {
		placedata.telephone = '02091 981543';
	} else {
		placedata.telephone = placedata.telephone[0];
	}
	if (!placedata.email) {
		placedata.email = placedata.name.replace(/[^A-Za-z0-9]/g,'') + '@shelter.org.uk';
	} else {
		placedata.email = placedata.email[0];
	}
	if (!placedata.website) {
		placedata.website = 'http://www.shelter.org.uk/' + placedata.name.replace(/[^A-Za-z0-9]/g,'');
	} else {
		placedata.website = placedata.website[0];
	}
	if (!placedata.description) {
		placedata.description = placedata.name + " is a homeless shelter dedicated to protecting and helping those in need.";
	} else {
		placedata.description = placedata.description[0];
	}

	placedata.latLng = [0,0];

	placedata.publicId = 'shelter' + i;

	placedata.needs = ['food','clothes'];
	if (getRandomInt(0, 2) === 1) {
		placedata.needs.push('time');
	}
	var newplace = new Place(placedata);
	newplace.save(function (err) {
		if (err) {
			console.log('Ohshi! ', err);
		}

		console.log('Good stuff!');

		checkIfDone();
	});
}

for (var i = oxfam.places.length - 1; i >= 0; i--) {
	var placedata = oxfam.places[i];

	if (placedata.name) {
		placedata.name = placedata.name[0];
	}

	if (placedata.address) {
		placedata.address = placedata.address[0];
	}

	if (!placedata.telephone) {
		placedata.telephone = '02041 987123';
	} else {
		placedata.telephone = placedata.telephone[0];
	}
	if (!placedata.email) {
		placedata.email = placedata.name.replace(/[^A-Za-z0-9]/g,'') + '@oxfam.org.uk';
	} else {
		placedata.email = placedata.email[0];
	}
	if (!placedata.website) {
		placedata.website = 'http://www.oxfam.org.uk/' + placedata.name.replace(/[^A-Za-z0-9]/g,'');
	} else {
		placedata.website = placedata.website[0];
	}
	if (!placedata.description) {
		placedata.description = placedata.name + " sells books, furniture and clothes. All proceeds go good causes.";
	} else {
		placedata.description = placedata.description[0];
	}
	placedata.latLng = [0,0];

	placedata.publicId = 'charity' + i;

	placedata.needs = ['food','clothes'];
	if (getRandomInt(0, 2) === 1) {
		placedata.needs.push('furniture');
	}
	var newplace = new Place(placedata);
	newplace.save(function (err) {
		if (err) {
			console.log('Ohshi! ', err);
		}

		console.log('Good stuff!');

		checkIfDone();
	});
}