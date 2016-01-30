angular.module( 'field-listing-controller', [] ).controller(
    'FieldListingCtrl',
    [
        '$scope',
        'FieldService',
        function( $scope, FieldService ) {
            $scope.fields = FieldService.query();
        }
    ]
);
