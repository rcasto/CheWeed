describe('Leafly Service Tests', function () {
	var $rootScope, $http;
	var ctrl, leaflyService;

	var testData = "test";

	beforeEach(module('CheWeed'));
	beforeEach(inject(function ($q, _$http_, _$rootScope_, _leaflyService_) {
		$rootScope = _$rootScope_;
		$http = _$http_;

		leaflyService = _leaflyService_;

		this.opts = {
			page: 1,
			take: 1,
			latitude: 1,
			longitude: 1
		};

		spyOn($http, 'get').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(testData);
            return deferred.promise;
		});
	}));

	it('can find locations', function () {
		var result = leaflyService.findLocations(this.opts);
		$rootScope.$digest(); // needed to run then function after promise is resolved
		expect(result.$$state.value).toBe(testData);
	});

	it('can get strains', function () {
		var result = leaflyService.getPopularStrains(this.opts);
		$rootScope.$digest(); // needed to run then function after promise is resolved
		expect(result.$$state.value).toBe(testData);
	});

});