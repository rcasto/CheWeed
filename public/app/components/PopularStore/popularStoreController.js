(function () {
    var app = angular.module('CheWeed');

    function compareStores(store1, store2) {
        return store1.distanceAway - store2.distanceAway;
    }

    var PopularStore = function ($scope, $log, leaflyService, geoLocationService, loggerService) {
        var defaultConfig = {
            take: 50
        };

        $scope.stores = [];
        $scope.currentPage = 0;
        $scope.numPages = 0;

        $scope.getStores = function (page, take) {
            var locPromise = geoLocationService.getLocation();
            // TODO: create timer service to contain timing logic in one object
            locPromise.then(function (success) {
                onLocation(success, page, take);
            }, onError);
        };

        $scope.prev = function () {
            if ($scope.currentPage > 0) {
                $scope.getStores(--$scope.currentPage, defaultConfig.take);
            }
        };

        // check paging context to make sure you don't go past last page
        // TODO: modify to use isFirstPage and isLastPage booleans in data from in leafly response
        $scope.next = function () {
            if ($scope.currentPage + 1 < $scope.numPages) {
                $scope.getStores(++$scope.currentPage, defaultConfig.take);
            }
        };

        function onLocation(coords, page, take) {
            var lat = coords.lat, lon = coords.lon;
            leaflyService.findLocations({
                page: page,
                take: take,
                latitude: lat,
                longitude: lon
            }).then(onStores, onError);
        }

        function onStores(success) {
            var userData = success.data.userData;
            var lat = userData.lat;
            var lon = userData.lon;

            var timeStart = Date.now(), timeEnd;

            $scope.numPages = success.data.pagingContext.PageCount;
            $scope.stores = success.data.stores.map(function (store) {
                store.distanceAway = geoLocationService.findDistance(lat, lon, 
                    store.latitude, store.longitude);
                return store;
            });
            $scope.stores.sort(compareStores);

            timeEnd = Date.now();

            $log.log('It took ' + (timeEnd - timeStart) + " milliseconds");
            loggerService.log({
                info: 'time taken to calculate store distance away and sort',
                timeTaken: (timeEnd - timeStart),
                timeLogged: (new Date()).getTime()
            });
        }

        function onError(error) {
            $log.error(error);
        }

        // get initial store data
        $scope.getStores(0, defaultConfig.take);
    };

    app.controller('PopularStore', PopularStore);
}());