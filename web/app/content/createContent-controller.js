angular.module( 'createContent-controller', [] )
	.controller( 'CreateContentCtrl', [ '$scope', 'ContentService', function( $scope, ContentService ) {
		$scope.content = {};

		$scope.save = function() {
            ContentService.save( $scope.content, function( response ) {
				alert( 'Content saved' );
			});
		};

	} ] );
