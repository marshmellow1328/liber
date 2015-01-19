angular.module( 'CreateFieldController', [] ).controller(
    'CreateFieldController',
    [
        '$scope',
        '$state',
        'FieldService',
        function( $scope, $state, FieldService ) {
            $scope.field = {};

            $scope.save = function() {
                FieldService.save(
                    $scope.field,
                    function() {
                        toastr.success( $scope.field.name + ' saved' );
                        $state.go( 'fields' );
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.field.name );
                    }
                );
            };
        }
    ]
);
