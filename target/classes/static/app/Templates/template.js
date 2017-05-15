'use strict';

angular.module('myApp.template', ['ngRoute'])

.controller('templateCtrl', ['$rootScope', '$scope', 'persona', '$location', function ($rootScope, $scope, persona, $location) {
		
      $scope.continueLogoutD=function(){
            $rootScope.logout();
      };

}]);
