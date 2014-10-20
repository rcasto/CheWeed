(function () {
    var app = angular.module('CheWeed');

    var GeoLocation;

    if (!navigator.geolocation) {
        GeoLocation = null;
    }

    var posOpts = {
        enableHighAccuracy: true
    };

    // return promise
    GeoLocation = function ($q) {
        this.getLocation = function () {
            console.log('Getting your location');
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (success) {
                var coords = success.coords;
                deferred.resolve({
                    lat: coords.latitude,
                    lon: coords.longitude
                });
            }, function (error) {
                console.error(error);
                deferred.reject(error);
            }, posOpts);
            return deferred.promise;
        };
    };

    app.service('geoLocationService', GeoLocation);
}());