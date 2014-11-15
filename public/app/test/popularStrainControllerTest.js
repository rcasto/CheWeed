describe('Popular Strain Controller Tests', function () {
	var $rootScope;
	var ctrl, leaflyService;

	var defaultConfig = {
        take: 10,
        initialPage: 0,
        sort: 'popular'
    };

	var testCoords = {
		lat: 10,
		lon: 10
	};
	var testPageState = {
		PageIndex: 2
	};
	var testStrains = ['strain1', 'strain2'];

	beforeEach(module('CheWeed'));
	beforeEach(inject(function ($controller, $log, $q, _$rootScope_, _leaflyService_) {
		$rootScope = _$rootScope_;
		leaflyService = _leaflyService_;

		spyOn(leaflyService, 'getPopularStrains').and.callFake(function () {
			var deferred = $q.defer();
			deferred.resolve({
				data: {
					Strains: testStrains,
					PagingContext: testPageState,
					userData: testCoords
				}
            });
            return deferred.promise;
		});

		ctrl = $controller('PopularStrainCtrl', {
			leaflyService: leaflyService,
			$log: $log
		});
		ctrl.pageState = testPageState;

		spyOn(ctrl, 'getStrains');
	}));

	it('can instantiate itself', function () {
		expect(ctrl.strainState).toBeDefined();
		expect(ctrl.pageState).toBeDefined();
	});

	it('can grab popular strains on init', function () {
		$rootScope.$digest(); // needed to run then function after promise is resolved
		expect(leaflyService.getPopularStrains).toHaveBeenCalled();
		expect(ctrl.strainState.strains).toEqual(testStrains);
	});

	it('prev functions properly', function () {
		ctrl.prev();
		expect(ctrl.getStrains).toHaveBeenCalledWith(testPageState.PageIndex - 1, defaultConfig.take, defaultConfig.sort);
	});

	it('next functions properly', function () {
		ctrl.next();
		expect(ctrl.getStrains).toHaveBeenCalledWith(testPageState.PageIndex + 1, defaultConfig.take, defaultConfig.sort);
	});

});