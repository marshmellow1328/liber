angular.module( 'liber', [ 'ui.router', 'content-controller', 'createContent-controller', 'content-service' ] )
	.config( function( $stateProvider, $urlRouterProvider ) {
		$stateProvider
			.state( 'content', {
				url: '',
				templateUrl: 'content/content.html',
				controller: 'ContentCtrl'
			} )
            .state( 'createContent', {
				url: '/create',
				templateUrl: 'content/createContent.html',
				controller: 'CreateContentCtrl'
			} )
	} );
