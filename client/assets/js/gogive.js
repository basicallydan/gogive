var goGive = angular.module('goGive', [], function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/components/search.html',
        controller: 'content'
    }).otherwise({
        templateUrl: '/components/details.html',
        controller: 'content'
    });
 
    $locationProvider.html5Mode(true);
});;goGive.controller('content', ['$scope', function($scope) {
	
}]);

function Content($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
};goGive.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});;goGive.controller('results', ['$scope', '$http', function($scope, $http) {

    $scope.results = [];
    $http.get('api/places').then(function(res){
        $scope.results = res.data;                
    });
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function(){
        return Math.ceil(
            $scope.results.length / $scope.pageSize
        );                
    }    
    $scope.isExists = function(item) {
        return !(typeof item == 'undefined');
    };
}]);;