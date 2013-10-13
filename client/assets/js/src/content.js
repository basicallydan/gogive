goGive.controller('content', ['$scope', function($scope) {
	
}]);

function Content($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}