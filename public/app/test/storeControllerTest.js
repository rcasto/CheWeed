describe('Store Controller Tests', function () {
	var $rootScope;
	var ctrl, geoLocationService, leaflyService;

	var testCoords = {
		lat: 10,
		lon: 10
	};
	var testPageState = {
		PageIndex: 2
	};
	var testStores = ['store1', 'store2'];

	beforeEach(module('CheWeed'));
	beforeEach(inject(function ($controller, _$rootScope_, $log, $q, _geoLocationService_, _leaflyService_) {
		$rootScope = _$rootScope_;
		geoLocationService = _geoLocationService_;
		leaflyService = _leaflyService_;

		spyOn(geoLocationService, 'getLocation').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve(testCoords);
            return deferred.promise;
		});
		spyOn(geoLocationService, 'findDistance').and.returnValue(0);

		spyOn(leaflyService, 'findLocations').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve({
				data: {
					stores: testStores,
					pagingContext: testPageState,
					userData: testCoords
				}
            });
            return deferred.promise;
		});

		ctrl = $controller('StoreCtrl', {
			$log: $log,
			geoLocationService: geoLocationService,
			leaflyService: leaflyService
		});
		ctrl.pageState = testPageState;

		spyOn(ctrl, 'getStores').and.callThrough();
	}));

	it('initializes correctly', function () {
		expect(ctrl.storeState).toBeDefined();
		expect(ctrl.pageState).toBeDefined();
	});

	it('gets user location on initialization', function () {
		expect(geoLocationService.getLocation).toHaveBeenCalled(); // TODO: add scope config to storeController to adjust page takes per user
	});

	it('gets nearest stores on initialization', function () {
		$rootScope.$digest(); // needed to run then function after promise is resolved
		expect(leaflyService.findLocations).toHaveBeenCalled();
		expect(ctrl.storeState.stores).toEqual(testStores);
	});

	it('prev functions properly', function () {
		ctrl.prev();
		expect(ctrl.getStores).toHaveBeenCalledWith(testPageState.PageIndex - 1, ctrl.config.take);
	});

	it('next functions properly', function () {
		ctrl.next();
		expect(ctrl.getStores).toHaveBeenCalledWith(testPageState.PageIndex + 1, ctrl.config.take);
	});

});