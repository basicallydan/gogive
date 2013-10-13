goGive.controller('results', ['$scope', '$http', function($scope, $http) {

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
}]);