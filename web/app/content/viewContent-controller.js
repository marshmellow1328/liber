angular.module( 'viewContent-controller', [] )
	.controller( 'ViewContentCtrl', [ '$scope', '$stateParams', '$state', 'ContentService', function( $scope, $stateParams, $state, ContentService ) {
        $scope.content = ContentService.get( { contentId: $stateParams.id } );

        $scope.save = function() {
            ContentService.update( { contentId: $scope.content._id }, $scope.content );
        };

        $scope.delete = function() {
            ContentService.delete( { contentId: $scope.content._id }, function() {
                $state.go( 'content' );
            } );
        };

	} ] );
