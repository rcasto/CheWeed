(function () {
    var app = angular.module("CheWeed");

    var Leafly = function ($http) {

        this.findLocations = function (opts) {
            if (!opts) { return; }
            return $http.post('/api/searchLocations', opts);
        };

    };

    app.service('leaflyService', Leafly);
}());