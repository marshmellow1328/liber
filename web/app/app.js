angular.module(
    'liber',
    [
        'ui.router',
        'content-controller',
        'viewContent-controller',
        'createContent-controller',
        'content-service'
    ]
);

angular.config(
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

        $urlRouterProvider.when( '', '/' );
	}
);
