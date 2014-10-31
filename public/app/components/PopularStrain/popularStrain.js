(function () {

	var app = angular.module('CheWeed');

	var PopularStrainsDirective = function () {
		return {
			scope: {

			},
			templateUrl: 'app/components/PopularStrain/popular-strain.html',
			controller: 'PopularStrainCtrl',
			controllerAs: 'strain'
		};
	};

	app.directive('cheweedPopularStrains', PopularStrainsDirective);
}())