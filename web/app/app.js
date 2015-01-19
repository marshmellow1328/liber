var app = angular.module(
    'liber',
    [
        'ui.router',
        'content-controller',
        'viewContent-controller',
        'createContent-controller',
        'content-service',
        'content-type-service',
        'content-types-controller',
        'create-content-type-controller',
        'FieldService',
        'FieldsController',
        'CreateFieldController',
        'edit-field-controller'
    ]
);

app.config(
    function( $stateProvider, $urlRouterProvider ) {
		$stateProvider.state(
            'content',
            {
				url: '/',
				templateUrl: 'content/content.html',
				controller: 'ContentCtrl'
			}
        );
        $stateProvider.state(
            'viewContent',
            {
				url: '/viewContent/:id',
				templateUrl: 'content/viewContent.html',
				controller: 'ViewContentCtrl'
			}
        );
        $stateProvider.state(
            'createContent',
            {
				url: '/create',
				templateUrl: 'content/createContent.html',
				controller: 'CreateContentCtrl'
			}
        );
        $stateProvider.state(
            'contentTypes',
            {
                url: '/content-types',
                templateUrl: 'content-types/content-types.html',
                controller: 'ContentTypesController'
            }
        );
        $stateProvider.state(
            'createContentType',
            {
                url: '/content-types/create',
                templateUrl: 'content-types/create-content-type.html',
                controller: 'CreateContentTypeController'
            }
        );
		$stateProvider.state(
            'fields',
            {
                url: '/fields',
                templateUrl: 'fields/fields.html',
                controller: 'FieldsController'
            }
        );
        $stateProvider.state(
            'createField',
            {
                url: '/fields/create',
                templateUrl: 'fields/createField.html',
                controller: 'CreateFieldController'
            }
        );
        $stateProvider.state(
            'editField',
            {
                url: '/fields/:id',
                templateUrl: 'fields/edit-field.html',
                controller: 'EditFieldController'
            }
        );

        $urlRouterProvider.when( '', '/' );
	}
);
