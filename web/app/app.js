var app = angular.module(
    'liber',
    [
        'ui.router',
        'content-listing-controller',
        'content-controller',
        'create-content-controller',
        'content-service',
        'content-type-service',
        'content-type-listing-controller',
        'create-content-type-controller',
        'content-type-controller',
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
            'contentTypeListing',
            {
                url: '/content-types',
                templateUrl: 'content-types/content-type-listing.html',
                controller: 'ContentTypeListingController'
            }
        );
        $stateProvider.state(
            'createContentType',
            {
                url: '/content-types/create',
                templateUrl: 'content-types/content-type.html',
                controller: 'CreateContentTypeController'
            }
        );
        $stateProvider.state(
            'contentType',
            {
                url: '/content-types/:id',
                templateUrl: 'content-types/content-type.html',
                controller: 'ContentTypeController'
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
