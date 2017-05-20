'use strict';

angular.module('myApp.MainPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/MainPage', {
    templateUrl: 'MainPage/MainPage.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$rootScope', '$scope', 'persona','personas','$http','$resource', '$location', function ($rootScope, $scope, persona, personas, $http, $resource, $location) {
    $scope.continuePlayMath=function(){
            $location.path("MathematicalCalculation");
    }
}]);
