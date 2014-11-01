(function () {
    var app = angular.module('CheWeed');

    var PopularStrainCtrl = function ($log, leaflyService) {
    	var defaultConfig = {
            take: 10,
            initialPage: 0,
            sort: 'popular'
        };

        this.strainState = {
        	strains: [],
        	loading: true
        };
        this.pageState = null;

        this.getStrains = function (page, take, sort) {
        	var that = this;

        	this.strainState.loading = true;

        	var strainPromise = leaflyService.getPopularStrains({
        		page: page,
        		take: take,
        		sort: sort
        	}).then(function (success) {
        		that.pageState = success.data.PagingContext;
        		that.strainState.strains = success.data.Strains;
        		that.strainState.loading = false;
        	}, function (error) {
        		onError(error);
        	});
        };

        this.prev = function () {
            this.getStrains(this.pageState.PageIndex - 1, defaultConfig.take, defaultConfig.sort);
        };

        this.next = function () {
            this.getStrains(this.pageState.PageIndex + 1, defaultConfig.take, defaultConfig.sort);
        };

        function onError(error) {
        	$log.error(error);
    	}

        this.getStrains(defaultConfig.initialPage, defaultConfig.take, defaultConfig.sort);
    };

    app.controller('PopularStrainCtrl', PopularStrainCtrl);
}());