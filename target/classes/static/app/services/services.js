'use strict';

angular.module('services.factory', ['ngRoute', 'ngResource'])
.factory('persona', function($resource){
	return $resource('https://alzheimergameservices.herokuapp.com/persona/:personaId',{id:"@_personaId"},{get: { method: 'GET'}});
})
.factory('personas', function($resource) {
	return $resource('https://alzheimergameservices.herokuapp.com/persona',{},{ 'get': { method: 'GET', isArray: true}, 'update': { method: 'PUT', isArray: false}});
})
.factory('newPersona', function($resource) {
	return $resource('https://alzheimergameservices.herokuapp.com/persona/new');
})
.factory('newGame', function($resource){
	return $resource('https://alzheimergameservices.herokuapp.com/persona/:personaId/newgame',{id:"@_personaId"});
})
;
