'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.Login',
  'myApp.MainPage',
  'myApp.MathematicalCalculation',
  'myApp.version',
  'myApp.template',
  'myApp.Pictures',
  'services.factory',
  'chart.js'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Login'});
}]);

