var goGive = angular.module('goGive', [], function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: '/components/search.html',
        controller: 'content'
    }).otherwise({
        templateUrl: '/components/details.html',
        controller: 'content'
    });
 
    $locationProvider.html5Mode(true);
});