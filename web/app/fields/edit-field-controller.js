angular.module( 'edit-field-controller', [] ).controller(
    'EditFieldController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'FieldService',
        function( $scope, $stateParams, $state, FieldService ) {
            $scope.field = FieldService.get( { id: $stateParams.id } );

            $scope.delete = function() {
                FieldService.delete(
                    { id: $scope.field._id },
                    function() {
                        toastr.success( $scope.field.name + ' deleted' );
                        $state.go( 'fields' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.field.name );
                    }
                );
            };
        }
    ]
);
