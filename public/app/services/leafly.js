(function () {
    var app = angular.module("CheWeed");

    var Leafly = function ($http, $q) {

    	var cache = {
            stores: {},
            strains: {}
        };

        this.findLocations = function (opts) {
			var deferred = $q.defer();
			var error = "";

            if (!opts) { error = "You must call findLocations with options - javascript object"; }
            if (!opts.latitude || !opts.longitude) { error = "You must call findLocations with coordinates (lat, lon)"; }
            if (opts.page && opts.page < 0) { error = "You must call findLocaitons with postive page index (>= 0)"; }
            if (opts.take && opts.take < 0) { error = "You must call findLocaitons with postive take (>= 0)"; }

            if (error.length > 0) {
            	deferred.reject(error);
            	return deferred.promise;
            }

            var httpOpts = {
                params: opts // add user params
            };

            $http.get('/api/searchLocations', httpOpts).then(function (success) {
            	deferred.resolve(success);
            }, function (error) {
            	deferred.reject(error);
            });

            return deferred.promise;
        };

        this.getPopularStrains = function (opts) {
            var deferred = $q.defer();
            var error = "";

            if (!opts) { error = "You must call findLocations with options - javascript object"; }
            if (opts.page && opts.page < 0) { error = "You must call getPopularStrains with postive page index (>= 0)"; }
            if (opts.take && opts.take < 0) { error = "You must call getPopularStrains with postive take (>= 0)"; }

            if (error.length > 0) {
                deferred.reject(error);
                return deferred.promise;
            }

            var httpOpts = {
                params: opts // add user params
            };

            $http.get('/api/popularStrains', httpOpts).then(function (success) {
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            })

            return deferred.promise;
        };

    };

    app.service('leaflyService', Leafly);
}());