(function () {
    var app = angular.module('CheWeed');

    var GeoLocation;

    if (!navigator.geolocation) {
        GeoLocation = null;
    } else {
        var posOpts = {
            enableHighAccuracy: true
        };

        GeoLocation = function ($q) {
            function deg2rad(deg) {
                return deg * (Math.PI/180);
            }

            this.getLocation = function () {
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

            // method taken from: http://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong
            this.findDistance = function (lat1, lon1, lat2, lon2) {
                var R = 3959; // Radius of the earth in km
                var dLat = deg2rad(lat2-lat1);  // deg2rad below
                var dLon = deg2rad(lon2-lon1);
                var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
                    Math.sin(dLon/2) * Math.sin(dLon/2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                var d = R * c; // Distance in km
                return d;
            };
        };
    }

    app.service('geoLocationService', GeoLocation);
}());