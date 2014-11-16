(function () {
    var app = angular.module('CheWeed');

    var SearchCtrl = function ($rootScope, leaflyService) {
    	var that = this;

    	this.searchState = {
    		searchText: ''
    	};

    	// listens for search text updates
    	$rootScope.$watch(function () {
    		return that.searchState.searchText;
    	}, function (newVal, oldVal) {
    		// only ran on initial run
    		if (newVal === oldVal) {
    			console.log('nothing changed');
    		}
    		
    	});
    };

    app.controller('SearchCtrl', SearchCtrl);
}());