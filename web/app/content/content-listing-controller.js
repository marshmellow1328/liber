angular.module( 'content-listing-controller', [] ).controller(
    'ContentListingCtrl',
    [
        '$scope',
        'ContentService',
        function( $scope, ContentService ) {
            $scope.content = ContentService.query();
	   }
    ]
);
