angular.module( 'create-content-type-controller', [] ).controller(
    'CreateContentTypeCtrl',
    [
        '$scope',
        '$state',
        'ContentTypeService',
        'FieldService',
        function( $scope, $state, ContentTypeService, FieldService ) {
            $scope.contentType = {
                fields: []
            };

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
                ContentTypeService.save(
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

            $scope.cancel = function() {
                returnToContentListing();
            };

            var returnToContentListing = function() {
                $state.go( 'contentListing' );
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
