angular.module('liber', ['ngRoute', 'controllers', 'services'])
		.config(['$routeProvider',
	                   function($routeProvider) {
	                     $routeProvider
	                       .when('/', {
	                    	  templateUrl: 'views/content.html',
	                    	  controller: 'ContentCtrl'
	                       })
	                       .when('/content', {
	                    	  templateUrl: 'views/content.html',
	                    	  controller: 'ContentCtrl'
	                       })
	                       .when('/viewContent/:id', {
	                    	  templateUrl: 'views/viewContent.html',
	                    	  controller: 'ViewContentCtrl'
	                       })
	                       .when('/createContent', {
	                    	  templateUrl: 'views/createContent.html',
	                    	  controller: 'CreateContentCtrl'
	                       })
	                       .when('/fields', {
	                    	  templateUrl: 'views/fields.html',
	                    	  controller: 'FieldsCtrl'
	                       })
	                       .when('/viewField/:id', {
	                    	  templateUrl: 'views/viewField.html',
	                    	  controller: 'ViewFieldCtrl'
	                       })
	                       .when('/editField/:id', {
	                    	  templateUrl: 'views/editField.html',
	                    	  controller: 'EditFieldCtrl'
	                       })
	                       .when('/editField', {
	                    	  templateUrl: 'views/editField.html',
	                    	  controller: 'EditFieldCtrl'
	                       })
	                       .when('/contentTypes', {
	                    	  templateUrl: 'views/contentTypes.html',
	                    	  controller: 'ContentTypesCtrl'
	                       })
	                       .when('/viewContentType/:id', {
	                    	  templateUrl: 'views/viewContentType.html',
	                    	  controller: 'ViewContentTypeCtrl'
	                       });
	                   }]);