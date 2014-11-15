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

            // var key = "p" + opts.page + "t" + opts.take;

            // TODO: save cache to local storage if possible, but fallback to in memory

            // check cache for page/take combo
            // if (cache.stores[key]) {
            //     deferred.resolve(cache.stores[key]);
            //     return deferred.promise;
            // }

            $http.post('/api/searchLocations', opts).then(function (success) {
            	// cache.stores[key] = success; // cache results for quicker access later
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

            // var key = "p" + opts.page + "t" + opts.take;

            // check cache for page/take combo
            // if (cache.strains[key]) {
            //     deferred.resolve(cache.strains[key]);
            //     return deferred.promise;
            // }

            $http.post('/api/popularStrains', opts).then(function (success) {
                // cache.strains[key] = success; // cache results for quicker access later
                deferred.resolve(success);
            }, function (error) {
                deferred.reject(error);
            })

            return deferred.promise;
        };

    };

    app.service('leaflyService', Leafly);
}());