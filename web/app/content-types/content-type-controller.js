angular.module( 'content-type-controller', [] ).controller(
    'ContentTypeCtrl',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentTypeService',
        'FieldService',
        function( $scope, $stateParams, $state, ContentTypeService, FieldService ) {
            var mode = 'view';

            $scope.contentType = ContentTypeService.get(
                {
                    contentTypeId: $stateParams.id
                }
            );

            FieldService.query(
                {},
                function( fields ) {
                    $scope.fieldOptions = fields;
                }
            );

            $scope.addField = function() {
                $scope.contentType.fields.push( {} );
            };

            $scope.removeField = function( index ) {
                $scope.contentType.fields.splice( index, 1 );
            };

            $scope.save = function() {
                ContentTypeService.update(
                    { contentTypeId: $scope.contentType._id },
                    $scope.contentType,
                    function() {
                        toastr.success( $scope.contentType.name + ' saved' );
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.contentType.name );
                    }
                );
            };

            $scope.delete = function() {
                ContentTypeService.delete(
                    { contentTypeId: $scope.contentType._id },
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
