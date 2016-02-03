angular.module( 'content-type-listing-controller', [] ).controller(
    'ContentTypeListingCtrl',
    [
        '$scope',
        'ContentTypeService',
        function( $scope, ContentTypeService ) {
            $scope.contentTypes = ContentTypeService.query();
        }
    ]
);
