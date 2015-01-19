var app = angular.module(
    'liber',
    [
        'ui.router',
        'content-controller',
        'viewContent-controller',
        'createContent-controller',
        'content-service',
        'FieldService',
        'FieldsController',
        'CreateFieldController'
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

        $urlRouterProvider.when( '', '/' );
	}
);
