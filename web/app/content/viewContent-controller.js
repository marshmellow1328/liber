angular.module( 'viewContent-controller', [] )
	.controller( 'ViewContentCtrl', [ '$scope', '$stateParams', 'ContentService', function( $scope, $stateParams, ContentService ) {
        $scope.content = ContentService.get( { contentId: $stateParams.id } );

        $scope.save = function() {
            ContentService.update( { contentId: $scope.content._id }, $scope.content );
        };
	} ] );
