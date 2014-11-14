describe('Store Controller Tests', function () {

	beforeEach(module('CheWeed'));

	var ctrl, scope, geoLocationService, leaflyService;

	var testCoords = {
		lat: 10,
		lon: 10
	};
	var testPageState = {

	};

	beforeEach(inject(function ($controller, $rootScope, $log, $q, _geoLocationService_, _leaflyService_) {
		geoLocationService = _geoLocationService_;
		leaflyService = _leaflyService_;

		spyOn(geoLocationService, 'getLocation').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(testCoords);
            return deferred.promise;
		});
		spyOn(leaflyService, 'findLocations').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve({
				data: {
					stores: ['store1', 'store2'],
					pagingContext: testPageState,
					userData: testCoords
				}
            });
            return deferred.promise;
		});

		scope = $rootScope.$new();
		ctrl = $controller('StoreCtrl', {
			$scope: scope,
			$log: $log,
			geoLocationService: geoLocationService,
			leaflyService: leaflyService
		});

		spyOn(scope, 'getStores').and.callThrough();
		spyOn(scope, 'prev').and.callThrough();
		spyOn(scope, 'next').and.callThrough();
	}));

	it('initializes store state correctly', function () {
		expect(scope.storeState).toBeDefined();
		expect(scope.storeState.stores).toBeDefined();
		expect(scope.storeState.loading).toBe(true);
	});

	it('gets user location on initialization', function () {
		expect(geoLocationService.getLocation).toHaveBeenCalled(); // TODO: add scope config to storeController to adjust page takes per user
	});

	it('gets nearest stores on initialization', function () {
		scope.$digest(); // needed to run then function after promise is resolved
		expect(leaflyService.findLocations).toHaveBeenCalled();
		expect(scope.storeState.stores.length).toBeGreaterThan(0);
	});

	it('can get stores from leafly', function () {
		var page = 0, take = 10;
		scope.getStores(page, take);
		expect(scope.getStores).toHaveBeenCalledWith(page, take);
		expect(geoLocationService.getLocation).toHaveBeenCalled();
		scope.$digest(); // needed to run then function after promise is resolved
		expect(leaflyService.findLocations).toHaveBeenCalled();
	});

});