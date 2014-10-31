(function () {

	var app = angular.module('CheWeed');

	var StoreDirective = function () {
		return {
			templateUrl: 'app/components/Store/store.html',
			controller: 'StoreCtrl',
			controllerAs: 'ctrl'
		};
	};

	app.directive('cheweedStoresNearby', StoreDirective);
}())