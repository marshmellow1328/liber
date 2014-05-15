angular.module('services', ['ngResource'])
	.factory('ContentService', function($resource) {
		return $resource('/api/content/:id', {});
	});