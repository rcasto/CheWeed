(function () {
    var app = angular.module('CheWeed');

    function compareStores(store1, store2) {
        return store1.distanceAway - store2.distanceAway;
    }

    var Store = function ($scope, $log, leaflyService, geoLocationService) {
        var defaultConfig = {
            take: 50, // how many dispensaries that are retrieved from Leafly
            userTake: 25, // how many dispensaries the user sees
            initialPage: 0
        };

        $scope.storeState = {
            stores: [],
            loading: true
        };

        $scope.getStores = function (page, take) {
            var locPromise;

            $scope.storeState.loading = true;

            locPromise = geoLocationService.getLocation();
            locPromise.then(function (success) {
                onLocation(success, page, take);
            }, onError);
        };

        $scope.prev = function () {
            $scope.getStores($scope.pageState.PageIndex - 1, defaultConfig.take);
        };

        $scope.next = function () {
            $scope.getStores($scope.pageState.PageIndex + 1, defaultConfig.take);
        };

        function onLocation(coords, page, take) {
            leaflyService.findLocations({
                page: page,
                take: take,
                latitude: coords.lat,
                longitude: coords.lon
            }).then(onStores, onError);
        }

        function onStores(success) {
            var userData = success.data.userData;
            var lat = userData.lat;
            var lon = userData.lon;
            var stores;

            $scope.pageState = success.data.pagingContext;

            stores = success.data.stores.map(function (store) {
                store.distanceAway = geoLocationService.findDistance(lat, lon,
                    store.latitude, store.longitude);
                return store;
            });
            stores.sort(compareStores);

            $scope.storeState.stores = stores.slice(0, defaultConfig.userTake);
            $scope.storeState.loading = false;
        }

        function onError(error) {
            $log.error(error);
        }

        // get initial store data
        $scope.getStores(defaultConfig.initialPage, defaultConfig.take);
    };

    app.controller('StoreCtrl', Store);
}());