angular.module( 'field-controller', [] ).controller(
    'FieldController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'FieldService',
        function( $scope, $stateParams, $state, FieldService ) {
            var mode = 'view';

            $scope.field = FieldService.get( { id: $stateParams.id } );

            $scope.delete = function() {
                FieldService.delete(
                    { id: $scope.field._id },
                    function() {
                        toastr.success( $scope.field.name + ' deleted' );
                        $state.go( 'fieldListing' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.field.name );
                    }
                );
            };

            $scope.edit = function() {
                mode = 'edit';
            };

            $scope.cancel = function() {
                mode = 'view';
            };

            $scope.isViewMode = function() {
                return mode === 'view';
            };

            $scope.isEditMode = function() {
                return mode === 'edit';
            };

            $scope.isCreateMode = function() {
                return false;
            };
        }
    ]
);
