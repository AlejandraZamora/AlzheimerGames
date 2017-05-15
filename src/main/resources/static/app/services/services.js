'use strict';

angular.module('services.factory', ['ngRoute', 'ngResource'])
.factory('persona', function($resource){
	return $resource('https://alzheimergamesservices.herokuapp.com/persona/:personaId',{id:"@_personaId"},{get: { method: 'GET'}});
})
.factory('personas', function($resource) {
	return $resource('https://alzheimergamesservices.herokuapp.com/persona',{},{ 'get': { method: 'GET', isArray: true}, 'update': { method: 'PUT', isArray: false}});
})
.factory('newPersona', function($resource) {
	return $resource('https://alzheimergamesservices.herokuapp.com/persona/new');
})
;
