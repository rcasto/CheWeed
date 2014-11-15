(function () {

	var app = angular.module('CheWeed');

	var StrainExplorerDirective = function () {
		return {
			templateUrl: 'app/components/StrainExplorer/strain-explorer.html',
			controller: 'StrainExplorerCtrl',
			controllerAs: 'expCtrl'
		};
	};

	app.directive('cheweedStrainExplorer', StrainExplorerDirective);
}())