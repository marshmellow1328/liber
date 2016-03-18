angular.module( 'content-type-controller', [] ).controller(
    'ContentTypeCtrl',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentTypeService',
        'FieldService',
        'dragulaService',
        function( $scope, $stateParams, $state, ContentTypeService, FieldService, dragulaService ) {
            var mode = 'view';

            dragulaService.options($scope, 'fields-bag', {
              removeOnSpill: true,
              accepts: function (el, target, source, sibling) {
                  return target.id !== 'fieldOptions';
              }

            });

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
                $scope.contentType.fields.push(
                    { pending: true }
                );
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
                        $state.go( 'contentTypeListing' );
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

            $scope.filter = function() {

            }

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
