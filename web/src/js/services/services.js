angular.module('services', ['ngResource'])
	.factory('ContentService', ['$resource', function($resource) {
		return $resource('/api/content/:id', {});
	}])
	.factory('FieldService', ['$resource', function($resource) {
		return $resource('/api/field/:id', null, {
			'update': { method: 'PUT' }
		});
	}]);