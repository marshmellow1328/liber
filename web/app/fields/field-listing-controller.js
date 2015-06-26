angular.module( 'field-listing-controller', [] ).controller(
    'FieldListingController',
    [
        '$scope',
        'FieldService',
        function( $scope, FieldService ) {
            $scope.fields = FieldService.query();
        }
    ]
);
