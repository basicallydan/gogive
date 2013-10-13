goGive.controller('content', ['$scope', '$location', '$http', function($scope, $location, $http) {
	var path = $location.$$path,
		query = 'api/places',
		needs = [],
		currentLocation = [51.5072, 0.1275];

	navigator.geolocation.getCurrentPosition(function(position) {
		currentLocation = [position.coords.latitude, position.coords.longitude];
	});

	if(path !== '/') {

		// Details
		$scope.result = {};

		query = 'api/places' + path;
		$http.get(query).then(function(res){

			// Update page
			$scope.result = res.data;

		}, function(res) {

			// Abuse our name placeholder for the error
			$scope.result = {
				name: res.data
			};

		});
		needs = $scope.result.needs || [];

	} else {

		// Search

		// Results
		$scope.results = [];
		$http.get(query).then(function(res){
			$scope.results = res.data.places;
		});

		// Pagination
		$scope.currentPage = 0;
		$scope.pageSize = 10;
		$scope.numberOfPages = function(){
			return Math.ceil(
				$scope.results.length / $scope.pageSize
			);
		};

		needs = $scope.results.needs || [];

		$scope.needChange = function() {

			$scope.results = {};
			query = 'api/places?needs=' + this.selectedItem + '&location=' + currentLocation[0] + ',' + currentLocation[1] + ',' + 10;
			$http.get(query).then(function(res){
				$scope.results = res.data.places;
			});
		};

	}

	// Needs
	$scope.needs = [];

	for(var i = 0; i < needs.length; i++) {
		var need = {};
		need.description = needs[i].description;
		if(needs[i].urgency !== 'normal') {
			need.style = 'urgency-' + needs[i].urgency;
		}
		$scope.push(need);
	}

	// Helper function for use in ng-switch
	$scope.isExists = function(item) {
		return !(typeof item == 'undefined');
	};

}]);