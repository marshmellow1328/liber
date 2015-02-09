var app = angular.module(
    'liber',
    [
        'ui.router',
        'content-listing-controller',
        'content-controller',
        'create-content-controller',
        'content-service',
        'content-type-service',
        'content-types-controller',
        'create-content-type-controller',
        'edit-content-type-controller',
        'FieldService',
        'FieldsController',
        'CreateFieldController',
        'edit-field-controller',
        'ngCkeditor'
    ]
);

app.config(
    function( $stateProvider, $urlRouterProvider ) {
		$stateProvider.state(
            'contentListing',
            {
				url: '/',
				templateUrl: 'content/content-listing.html',
				controller: 'ContentListingCtrl'
			}
        );
        $stateProvider.state(
            'content',
            {
				url: '/content/:id',
				templateUrl: 'content/content.html',
				controller: 'ContentCtrl'
			}
        );
        $stateProvider.state(
            'createContent',
            {
				url: '/create',
				templateUrl: 'content/content.html',
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
            'editContentType',
            {
                url: '/content-types/:id',
                templateUrl: 'content-types/edit-content-type.html',
                controller: 'EditContentTypeController'
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
