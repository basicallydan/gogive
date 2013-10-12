var key = require('../config/config.json').googlePlacesAPIKey;
var requestUri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

requestUri += '?key=' + key;
requestUri += '&location=' + '51.5072,0.1275';
requestUri += '&radius=16093'; // About 10 miles
requestUri += '&sensor=true';
requestUri += '&keyword=charity';