angular.module( 'content-type-listing-controller', [] ).controller(
    'ContentTypeListingController',
    [
        '$scope',
        'ContentTypeService',
        function( $scope, ContentTypeService ) {
            $scope.contentTypes = ContentTypeService.query();
        }
    ]
);
