angular.module( 'FieldsController', [] ).controller(
    'FieldsController',
    [
        '$scope',
        'FieldService',
        function( $scope, FieldService ) {
            $scope.fields = FieldService.query();
        }
    ]
);
