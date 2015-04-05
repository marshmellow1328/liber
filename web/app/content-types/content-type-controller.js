angular.module( 'content-type-controller', [] ).controller(
    'ContentTypeController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentTypeService',
        'FieldService',
        function( $scope, $stateParams, $state, ContentTypeService, FieldService ) {
            var mode = 'view';

            $scope.contentType = ContentTypeService.get( { id: $stateParams.id } );

            FieldService.query(
                {},
                function( fields ) {
                    $scope.fieldOptions = fields;
                }
            );

            $scope.delete = function() {
                ContentTypeService.delete(
                    { id: $scope.contentType._id },
                    function() {
                        toastr.success( $scope.contentType.name + ' deleted' );
                        $state.go( 'contentTypeListing' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.contentType.name );
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
