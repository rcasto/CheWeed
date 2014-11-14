describe('Popular Strain Controller Tests', function () {

	beforeEach(module('CheWeed'));

	var ctrl, scope, leaflyService;

	beforeEach(inject(function ($controller, $rootScope, _leaflyService_) {
		leaflyService = _leaflyService_;

		scope = $rootScope.$new();
		ctrl = $controller('PopularStrainCtrl', {
			$scope: scope,
			leaflyService: leaflyService
		});

	}));

});