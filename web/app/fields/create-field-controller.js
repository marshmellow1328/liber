angular.module( 'create-field-controller', [] ).controller(
    'CreateFieldController',
    [
        '$scope',
        '$state',
        'FieldService',
        function( $scope, $state, FieldService ) {
            $scope.field = {};
            $scope.field.values = [];

            $scope.addValue = function() {
                $scope.field.values.push( { value: '' } );
            };

            $scope.removeValue = function( index ) {
                $scope.field.values.splice( index, 1 );
            };

            $scope.save = function() {
                FieldService.save(
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

            $scope.cancel = function() {
                returnToFieldListing();
            };

            var returnToFieldListing = function() {
                $state.go( 'fieldListing' );
            };

            $scope.isViewMode = function() {
                return false;
            };

            $scope.isEditMode = function() {
                return false;
            };

            $scope.isCreateMode = function() {
                return true;
            };
        }
    ]
);
