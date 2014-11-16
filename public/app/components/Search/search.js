(function () {

	var app = angular.module('CheWeed');

	var SearchDirective = function () {
		return {
			templateUrl: 'app/components/Search/search.html',
			controller: 'SearchCtrl',
			controllerAs: 'ctrl'
		};
	};

	app.directive('cheweedSearch', SearchDirective);
}())