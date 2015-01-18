angular.module( 'content-controller', [] )
	.controller( 'ContentCtrl', [ '$scope', 'ContentService', function( $scope, ContentService ) {
        $scope.content = ContentService.query();
	} ] );
