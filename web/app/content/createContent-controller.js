angular.module( 'createContent-controller', [] )
	.controller( 'CreateContentCtrl', [ '$scope', '$state', 'ContentService', function( $scope, $state, ContentService ) {
		$scope.content = {};

		$scope.save = function() {
            ContentService.save( $scope.content, function( response ) {
				$state.go( 'content' );
			});
		};

	} ] );
