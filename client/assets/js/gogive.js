var goGive = angular.module('goGive',[]);
 
goGive.controller('results', ['$scope', function($scope) {
    $scope.results = [{
        name: 'NAME!',
        needs: [
            {
                title: 'Food donations urgently needed',
                style: 'donations-urgent'
            },
            {
                title: 'Food',
                url: '#'
            },
            {
                title: 'Food',
                url: '#'
            },
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        website: "http://test.com/"
    },{
        name: 'NAME!',
        needs: [
            {
                title: 'Food donations urgently needed',
                style: 'donations-urgent'
            },
            {
                title: 'Food',
                url: '#'
            },
            {
                title: 'Food',
                url: '#'
            },
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        website: "http://test.com/"
    },{
        name: 'NAME!',
        needs: [
            {
                title: 'Food donations urgently needed',
                style: 'donations-urgent'
            },
            {
                title: 'Food',
                url: '#'
            },
            {
                title: 'Food',
                url: '#'
            },
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        website: "http://test.com/"
    },{
        name: 'NAME!',
        needs: [
            {
                title: 'Food donations urgently needed',
                style: 'donations-urgent'
            },
            {
                title: 'Food',
                url: '#'
            },
            {
                title: 'Food',
                url: '#'
            },
        ],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        website: "http://test.com/"
    }];
    $scope.isExists = function(item) {
        return !(typeof item == 'undefined');
    };
}]);