angular.module( 'field-controller', [] ).controller(
    'FieldCtrl',
    [
        '$scope',
        '$stateParams',
        '$state',
        'FieldService',
        function( $scope, $stateParams, $state, FieldService ) {
            var mode = 'view';

            $scope.field = FieldService.get( { fieldId: $stateParams.id } );

            $scope.addValue = function() {
                $scope.field.values.push( { value: '' } );
            };

            $scope.removeValue = function( index ) {
                $scope.field.values.splice( index, 1 );
            };

            $scope.save = function() {
                FieldService.update(
                    { fieldId: $scope.field._id },
                    $scope.field,
                    function() {
                        toastr.success( $scope.field.name + ' saved' );
                        $state.go( 'fieldListing' );
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.field.name );
                    }
                );
            };

            $scope.delete = function() {
                FieldService.delete(
                    { fieldId: $scope.field._id },
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
