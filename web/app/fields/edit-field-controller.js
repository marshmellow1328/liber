angular.module( 'edit-field-controller', [] ).controller(
    'EditFieldController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'FieldService',
        function( $scope, $stateParams, $state, FieldService ) {
            $scope.field = FieldService.get( { id: $stateParams.id } );
        }
    ]
);
