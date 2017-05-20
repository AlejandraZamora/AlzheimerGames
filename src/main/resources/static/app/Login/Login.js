'use strict';

angular.module('myApp.Login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Login', {
    templateUrl: 'Login/Login.html',
    controller: 'LoginCtrl'
  });
}])
.config(function ($httpProvider) {
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $httpProvider.defaults.headers.get = {};
})

.controller('LoginCtrl', ['$rootScope', '$scope', 'persona','personas','$http','$resource', '$location', function ($rootScope, $scope, persona, personas, $http, $resource, $location) {
        $rootScope.logout = function () {
          $rootScope.authenticated = false;
          $location.path("/");
        };
		var authenticate = function (credentials, callback) {
	        if(credentials){
	            $rootScope.idPersona=credentials.username;
	            $rootScope.pasPersona=credentials.password;
	        }
	         var headers = credentials ? {authorization: "Basic "
	                     + btoa("12dea96fec20593566ab75692c9949596833adc9" + ":" + "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8")
	         } : {};

	         $http.get('user', {headers: headers}).then(function (data) {
	             if (data.data.name) {
	                 $rootScope.authenticated = true;
	             } else {
	                 $rootScope.authenticated = false;
	             }
	             callback && callback();
	         }, function () {
	             $rootScope.authenticated = false;
	             callback && callback();
	         });
	
	     };
	     
	     authenticate();
	              $scope.credentials = {};
	              $scope.login = function () {
	                  authenticate($scope.credentials, function () {
	                      if ($rootScope.authenticated) {
	                         $scope.error = false;
	                         persona.get({personaId:""+$rootScope.idPersona})
	                         .$promise.then(
	                                 //success
	                                 function( value ){
	                                     $scope.personaH=value;
	                                     if(($scope.personaH.password==$rootScope.pasPersona) && ($scope.personaH.role=="Paciente")){
                                            $location.path("MainPage");
	                                     }else{
	                                         $rootScope.authenticated=false;
	                                         alert("No estás registrado como un paciente!");
	                                         $scope.error = true;
	                                         $rootScope.logout();
	                                     }
	                                 },
	                                 //error
	                                 function( error ){
	                                     $rootScope.authenticated=false;
	                                     alert("Autenticacion Fallida");
	                                     $scope.error = true;
	                                     $rootScope.logout();
	                                 }
	                         );
	                      } else {
	                          $scope.error = true;
	                          alert("Autenticacion Fallida");
	                          $rootScope.logout();
	                      }
	                  });
	         };
        
}]);
