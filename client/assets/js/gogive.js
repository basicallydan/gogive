angular.module('templates-main', ['components/details.html', 'components/hero.html', 'components/location.html', 'components/needs.html', 'components/results.html', 'components/search.html']);

angular.module("components/details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/details.html",
    "<div class=\"details\">\n" +
    "\n" +
    "    <div ng-switch on=\"isExists(result.name)\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "            <h2>{{result.name}}</h2>\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <div class=\"load\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"grid\">\n" +
    "        <div class=\"col w-66\">\n" +
    "            <div class=\"pad\">\n" +
    "\n" +
    "                <h3 class=\"access\">Needs</h3>\n" +
    "\n" +
    "                <div ng-include src=\"'/components/needs.html'\"></div>\n" +
    "                <div class=\"description\">\n" +
    "                    {{result.description}}\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col w-33\">\n" +
    "            <div class=\"pad\">\n" +
    "\n" +
    "                <div class=\"location\">\n" +
    "                    <h3 class=\"access\">Location</h4>\n" +
    "                    <div ng-include src=\"'/components/location.html'\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/hero.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/hero.html",
    "<div class=\"hero\">\n" +
    "    I have\n" +
    "        <select name=\"category\">\n" +
    "            <option></option>\n" +
    "            <option>Food</option>\n" +
    "            <option>Money</option>\n" +
    "            <option>Books</option>\n" +
    "            <option>Clothes</option>\n" +
    "            <option>Furniture</option>\n" +
    "            <option>Blood</option>\n" +
    "            <option>Time</option>\n" +
    "        </select>\n" +
    "    to donate\n" +
    "</div>");
}]);

angular.module("components/location.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/location.html",
    "<p ng-show=\"isExists(result.address)\" ng-bind-html-unsafe=\"result.address\"></p>\n" +
    "<div class=\"website\">\n" +
    "    <a href=\"{{result.website}}\">\n" +
    "        {{result.website}}\n" +
    "    </a>\n" +
    "</div>");
}]);

angular.module("components/needs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/needs.html",
    "<ul class=\"needs\">\n" +
    "	<li ng-repeat=\"need in result.needs\" ng-switch on=\"isExists(need.style)\">\n" +
    "	    <div ng-switch-when=\"true\" class=\"{{need.style}}\">\n" +
    "	        {{need}}\n" +
    "	    </div>\n" +
    "	    <a ng-switch-default href=\"{{need.url}}\">\n" +
    "	        {{need}}\n" +
    "	    </a>\n" +
    "	</li>  \n" +
    "</ul>");
}]);

angular.module("components/results.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/results.html",
    "<div class=\"results\" ng-controller=\"results\">\n" +
    "    <div ng-switch on=\"isExists(results[0].name)\">\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "\n" +
    "            <div class=\"filter\">\n" +
    "                {{results.length}} Results\n" +
    "            </div>\n" +
    "\n" +
    "            <h2 class=\"access\">Results</h2>\n" +
    "\n" +
    "            <div class=\"results-list\">\n" +
    "                <div class=\"result\" ng-repeat=\"result in results | startFrom: currentPage * pageSize | limitTo: pageSize\">\n" +
    "                    <div class=\"head\">\n" +
    "                        <h3>\n" +
    "                            <a href=\"/{{result.publicId}}\">{{result.name}}</a>\n" +
    "                        </h3>\n" +
    "                        <a href=\"/{{result.publicId}}\" class=\"btn btn-sml\">\n" +
    "                            Give &#187;\n" +
    "                        </a>\n" +
    "                    </div>\n" +
    "                    <div class=\"grid\">\n" +
    "                        <div class=\"col w-66\">\n" +
    "                            <div class=\"pad\">\n" +
    "\n" +
    "                                <h4 class=\"access\">Needs</h4>\n" +
    "                                <div ng-include src=\"'/components/needs.html'\"></div>\n" +
    "                                <div class=\"description\">\n" +
    "                                    {{result.description}}\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col w-33\">\n" +
    "                            <div class=\"pad location\">\n" +
    "\n" +
    "                                <h4 class=\"access\">Location</h4>\n" +
    "                                <div ng-include src=\"'/components/location.html'\"></div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"pagination\" ng-show=\"numberOfPages() > 1\">\n" +
    "                <button\n" +
    "                    ng-disabled=\"currentPage == 0\"\n" +
    "                    ng-click=\"currentPage=currentPage-1\"\n" +
    "                    class=\"btn btn-alt\">\n" +
    "                    Previous\n" +
    "                </button>\n" +
    "                {{currentPage + 1}} / {{numberOfPages()}}\n" +
    "                <button\n" +
    "                    ng-disabled=\"currentPage >= numberOfPages() - 1\"\n" +
    "                    ng-click=\"currentPage=currentPage+1\"\n" +
    "                    class=\"btn btn-alt\">\n" +
    "                    Next\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div ng-switch-default>\n" +
    "            <div class=\"load\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("components/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("components/search.html",
    "    <div ng-include src=\"'/components/hero.html'\"></div>        \n" +
    "	<div ng-include src=\"'/components/results.html'\"></div>\n" +
    "        ");
}]);
;var goGive = angular.module('goGive', [], function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
        templateUrl: 'components/search.html',
        controller: 'content'
    }).otherwise({
        templateUrl: 'components/details.html',
        controller: 'content'
    });
 
    $locationProvider.html5Mode(true);
});;goGive.controller('content', ['$scope', '$location', '$http', function($scope, $location, $http) {
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

}]);;goGive.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});;goGive.controller('results', ['$scope', function($scope) {



}]);