require('angular');
require('angular-route');
require('angular-animate');
require('angular-flash-alert');
require('angular-material');
require('angular-aria');
require('angular-messages');
require('angular-drag-and-drop-lists');
var homeController = require('./home/home.js');
var apiFactory = require('./services/api-services.js');

// Import directives
var statusCol = require('./directives/status/status-col.js');

var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngFlash', 'ngMaterial', 'dndLists'])

app.config([
    '$locationProvider',
    '$routeProvider',
    function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
        // routes
        $routeProvider
            .when("/", {
                templateUrl: "app/home/home.html",
                controller: "homeController"
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

app.controller('homeController', ['$scope', 'API', 'Flash', homeController]);
app.factory('API', ['$http', '$q', apiFactory]);


app.directive('statusCol', [statusCol]);