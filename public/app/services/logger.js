(function () {
    var app = angular.module("CheWeed");

    var Logger = function ($http) {

        this.log = function (obj) {
            return $http.post('/api/log', obj);
        };

    };

    app.service('loggerService', Logger);
}());