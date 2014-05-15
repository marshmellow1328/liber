angular.module('liber', ['ngRoute', 'controllers', 'services'])
		.config(['$routeProvider',
	                   function($routeProvider) {
	                     $routeProvider.
	                       when('/', {
	                    	  templateUrl: 'views/content.html',
	                    	  controller: 'ContentCtrl'
	                       });
	                   }]);