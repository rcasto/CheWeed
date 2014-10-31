(function () {

	var app = angular.module('CheWeed');

	var SearchDirective = function () {
		return {
			scope: {

			},
			templateUrl: 'app/components/Search/search.html',
			controller: 'SearchCtrl',
			controllerAs: 'search'
		};
	};

	app.directive('cheweedSearch', SearchDirective);
}())