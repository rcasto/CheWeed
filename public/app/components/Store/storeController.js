(function () {
    var app = angular.module('CheWeed');

    function compareStores(store1, store2) {
        return store1.distanceAway - store2.distanceAway;
    }

    var Store = function ($log, leaflyService, geoLocationService) {
        this.config = {
            take: 50, // how many dispensaries that are retrieved from Leafly
            userTake: 10, // how many dispensaries the user sees
            initialPage: 0
        };

        this.storeState = {
            stores: [],
            loading: true
        };
        this.pageState = null; // obtained when stores are loaded from leafly

        this.getStores = function (page, take) {
            var that = this;

            this.storeState.loading = true;

            geoLocationService.getLocation().then(function (success) {
                onLocation.apply(that, [success, page, take]);
            }, onError);
        };

        this.prev = function () {
            this.getStores(this.pageState.PageIndex - 1, this.config.take);
        };

        this.next = function () {
            this.getStores(this.pageState.PageIndex + 1, this.config.take);
        };

        function onLocation(coords, page, take) {
            var that = this;
            
            leaflyService.findLocations({
                page: page,
                take: take,
                latitude: coords.lat,
                longitude: coords.lon
            }).then(function (success) {
                onStores.apply(that, [success]);
            }, onError);
        }

        function onStores(success) {
            var userData = success.data.userData;
            var lat = userData.lat;
            var lon = userData.lon;
            var stores;

            this.pageState = success.data.pagingContext;

            stores = success.data.stores.map(function (store) {
                store.distanceAway = geoLocationService.findDistance(lat, lon,
                    store.latitude, store.longitude);
                return store;
            });
            stores.sort(compareStores);

            this.storeState.stores = stores.slice(0, this.config.userTake);
            this.storeState.loading = false;
        }

        function onError(error) {
            $log.error(error);
        }

        // get initial store data
        this.getStores(this.config.initialPage, this.config.take);
    };

    app.controller('StoreCtrl', Store);
}());