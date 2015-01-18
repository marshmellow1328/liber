angular.module( 'liber', [ 'ui.router', 'content-controller', 'viewContent-controller', 'createContent-controller', 'content-service' ] )
	.config( function( $stateProvider, $urlRouterProvider ) {
		$stateProvider
			.state( 'content', {
				url: '/',
				templateUrl: 'content/content.html',
				controller: 'ContentCtrl'
			} )
            .state( 'viewContent', {
				url: '/viewContent/:id',
				templateUrl: 'content/viewContent.html',
				controller: 'ViewContentCtrl'
			} )
            .state( 'createContent', {
				url: '/create',
				templateUrl: 'content/createContent.html',
				controller: 'CreateContentCtrl'
			} );

        $urlRouterProvider.when( '', '/' );
	} );
