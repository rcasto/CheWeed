(function () {

	var app = angular.module('CheWeed');

	var StoreDirective = function () {
		return {
			templateUrl: 'app/components/Store/store.html',
			controller: 'StoreCtrl',
			controllerAs: 'storeCtrl'
		};
	};

	app.directive('cheweedStoresNearby', StoreDirective);
}())