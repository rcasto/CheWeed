(function () {
    var app = angular.module('CheWeed');

    var PopularStore = function ($scope, leaflyService, geoLocationService) {
        $scope.stores = [];

        $scope.getStores = function (page, take) {
            var locPromise = geoLocationService.getLocation();
            locPromise.then(function (success) {
                var lat = success.lat, lon = success.lon;
                leaflyService.findLocations({
                    page: page,
                    take: take,
                    latitude: lat,
                    longtitude: lon
                }).then(function (success) {
                    console.log(success);
                }, function (error) {
                   console.error(error);
                });
            }, function (error) {
                console.error(error);
            });
        };
    };

    app.controller('PopularStore', PopularStore);
}());