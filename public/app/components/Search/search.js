(function () {

	var app = angular.module('CheWeed');

	var SearchDirective = function () {
		return {
			templateUrl: 'app/components/Search/search.html',
			controller: 'SearchCtrl',
			controllerAs: 'searchCtrl'
		};
	};

	app.directive('cheweedSearch', SearchDirective);
}())