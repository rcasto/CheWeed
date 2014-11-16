(function () {
    var app = angular.module('CheWeed');

    var StrainExplorerCtrl = function ($log, leaflyService) {
    	this.config = {
            take: 10,
            initialPage: 0,
            sort: 'newest'
        };

        this.strainState = {
        	strains: [],
        	loading: true
        };
        this.pageState = null;
        this.sortTypes = {
            'Popular': 'popular',
            'Top Rated': 'rating',
            'Newest': 'newest'
        };

        this.getStrains = function (page, take, sort) {
        	var that = this;

        	this.strainState.loading = true;

        	leaflyService.getStrains({
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
            this.getStrains(this.pageState.PageIndex - 1, this.config.take, this.config.sort);
        };

        this.next = function () {
            this.getStrains(this.pageState.PageIndex + 1, this.config.take, this.config.sort);
        };

        function onError(error) {
        	$log.error(error);
    	}

        this.getStrains(this.config.initialPage, this.config.take, this.config.sort);
    };

    app.controller('StrainExplorerCtrl', StrainExplorerCtrl);
}());