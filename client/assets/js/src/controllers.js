goGive.controller('content', ['$scope', '$location', '$http', function($scope, $location, $http) {
	var path = $location.$$path,
		query = 'api/places';

	if(path !== '/') {

		// Details
	    $scope.result = {};

	    query += path;
	    $http.get(query).then(function(res){

	       	// Update page
	       	$scope.result = res.data;

	   	}, function(res) {

	    	// Abuse our name placeholder for the error
       		$scope.result = {
       			name: res.data
       		};

	    });

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
		}


	}

	// Helper function for use in ng-switch
	$scope.isExists = function(item) {
	    return !(typeof item == 'undefined');
	};

}]);