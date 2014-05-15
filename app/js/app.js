angular.module('liber', ['ngRoute', 'controllers', 'services'])
		.config(['$routeProvider',
	                   function($routeProvider) {
	                     $routeProvider.
	                       when('/', {
	                    	  templateUrl: 'views/content.html',
	                    	  controller: 'ContentCtrl'
	                       }).
	                       when('/content', {
	                    	  templateUrl: 'views/content.html',
	                    	  controller: 'ContentCtrl'
	                       }).
	                       when('/viewContent/:id', {
	                    	  templateUrl: 'views/viewContent.html',
	                    	  controller: 'ViewContentCtrl'
	                       }).
	                       when('/createContent', {
	                    	  templateUrl: 'views/createContent.html',
	                    	  controller: 'CreateContentCtrl'
	                       });
	                   }]);