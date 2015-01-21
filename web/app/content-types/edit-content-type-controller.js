angular.module( 'edit-content-type-controller', [] ).controller(
    'EditContentTypeController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentTypeService',
        'FieldService',
        function( $scope, $stateParams, $state, ContentTypeService, FieldService ) {
            $scope.type = ContentTypeService.get( { id: $stateParams.id } );

            FieldService.query(
                {},
                function( fields ) {
                    $scope.fieldOptions = fields;
                }
            );

            $scope.delete = function() {
                ContentTypeService.delete(
                    { id: $scope.type._id },
                    function() {
                        toastr.success( $scope.type.name + ' deleted' );
                        $state.go( 'content' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.type.name );
                    }
                );
            };
        }
    ]
);
