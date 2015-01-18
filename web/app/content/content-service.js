angular.module( 'content-service', [ 'ngResource' ] )
	.factory( 'ContentService', [ '$resource', function( $resource ) {
		return $resource( '/api/content/:contentId', null, {
            'update': { method: 'PUT' }
        } );
	}]);
