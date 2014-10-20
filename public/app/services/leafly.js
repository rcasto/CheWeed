(function () {
    var app = angular.module("CheWeed");

    var Leafly = function ($http) {

        this.findLocations = function (opts) {
            if (!opts) { return; }
            opts["timeout"] = 10000;
            return $http.post('/api/searchLocations', opts);
        };
    };

    app.service('leaflyService', Leafly);
}());