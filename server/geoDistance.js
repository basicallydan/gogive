/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*                                                                                                */
/*  Simple node js module to get distance between two coordinates.                                */
/*                                                                                                */
/*  Code transformed from Chris Veness example code - please refer to his website for licensing   */
/*  questions.                                                                                    */
/*                                                                                                */
/*                                                                                                */
/*  Latitude/longitude spherical geodesy formulae & scripts (c) Chris Veness 2002-2011            */
/*   - www.movable-type.co.uk/scripts/latlong.html                                                */
/*                                                                                                */
/*                                                                                                */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/** Converts numeric degrees to radians */
if(typeof(Number.prototype.toRad) === "undefined") {
	Number.prototype.toRad = function () {
		return this * Math.PI / 180;
	};
}

// start and end are objects with latitude and longitude
// decimals (default 2) is number of decimals in the output
// return is distance in kilometres.
exports.getDistance = function (start, end, decimals) {
	var earthRadius = 6371000; // km
	var lat1 = parseFloat(start[0]);
	var lat2 = parseFloat(end[0]);
	var lon1 = parseFloat(start[1]);
	var lon2 = parseFloat(end[1]);
	decimals = decimals || 2;

	var dLat = (lat2 - lat1).toRad();
	var dLon = (lon2 - lon1).toRad();
	lat1 = lat1.toRad();
	lat2 = lat2.toRad();

	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = earthRadius * c;
	return Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

exports.interpolate = function (l1, l2, f) {
	if (l1.lat === l2.lat && l1.lon === l2.lon) {
		return [l1.lat, l1.lon];
	}
	var deg2rad = Math.PI / 180.0,
		lat1 = l1.lat * deg2rad,
		lon1 = l1.lon * deg2rad,
		lat2 = l2.lat * deg2rad,
		lon2 = l2.lon * deg2rad;

	var d = 2 * Math.asin(
		Math.sqrt(
			Math.pow(Math.sin((lat1 - lat2) / 2), 2) +
			Math.cos(lat1) * Math.cos(lat2) *
			Math.pow(Math.sin((lon1 - lon2) / 2), 2))
		);

	var A = Math.sin((1-f)*d)/Math.sin(d);
	var B = Math.sin(f*d)/Math.sin(d);
	var x = A * Math.cos(lat1) * Math.cos(lon1) +
		B * Math.cos(lat2) * Math.cos(lon2);
	var y = A * Math.cos(lat1) * Math.sin(lon1) +
		B * Math.cos(lat2) * Math.sin(lon2);
	var z = A * Math.sin(lat1) + B * Math.sin(lat2);

	var latN = Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
	var lonN = Math.atan2(y,x);

	return [latN / deg2rad, lonN / deg2rad];
};

exports.interpolateByDistance = function (l1, l2, metres) {
	var distanceInMetres = exports.distance(
		{ lat: l1[0], lon: l1[1] },
		{ lat: l2[0], lon: l2[1] }
	),
		m = metres / distanceInMetres,
		f = m,
		points = [];
	while (f < distanceInMetres) {
		points.push(exports.interpolate({ lat : l1[0], lon : l1[1] }, { lat : l2[0], lon : l2[1] }, f));
		f += m;
	}
	return points;
};