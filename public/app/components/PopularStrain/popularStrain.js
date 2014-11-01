(function () {

	var app = angular.module('CheWeed');

	var PopularStrainsDirective = function () {
		return {
			templateUrl: 'app/components/PopularStrain/popular-strain.html',
			controller: 'PopularStrainCtrl',
			controllerAs: 'strainCtrl'
		};
	};

	app.directive('cheweedPopularStrains', PopularStrainsDirective);
}())