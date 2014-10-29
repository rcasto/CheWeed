'use strict';

(function () {
    // Declare app level module which depends on views, and components
    angular.module('CheWeed', [
        'ngRoute'
    ]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/home-page.html'
        }).when('/search', {

        }).otherwise({
            redirectTo: '/'
        });
    }]);
}());