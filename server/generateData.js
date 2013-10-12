var numberOfCharities = 10;
var possibleNeeds = ['food', 'time', 'blood', 'money', 'books', 'furniture'];
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

for (var i = 0; i < numberOfCharities; i++) {
	var org = new Place({
		name: 'Place ' + i,
		address: i + ' Place Street, London, N1',
		latLng: [51.5072, 0.1275],
		needs: getRandomNeeds(),
		telephone: '01923 5722' + i + getRandomInt(0, 9),
		email: 'contact@charity' + i + '.com',
		paypalEmail: 'contact@charity' + i + '.com',
		description: 'this is charity' + i + ', we need some things and like stuff etc.',
		website: 'http://www.charity.com',
		publicId: 'char' + i,
		phoneSubscribers: [ '+44 7986533037' ]
	});

	org.save(function (err) {
		if (err) {
			console.log('Ohshi! ');
		}

		console.log('Good stuff!');

		done++;

		if (done === i) {
			console.log('SORTED!');
		}
	});
}