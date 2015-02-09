angular.module( 'create-content-controller', [] ).controller(
    'CreateContentCtrl',
    [
        '$scope',
        '$state',
        'ContentService',
        'ContentTypeService',
        function( $scope, $state, ContentService, ContentTypeService ) {
            $scope.content = {};
            ContentTypeService.query(
                function( contentTypes ) {
                    $scope.contentTypes = contentTypes;
                }
            );

            $scope.save = function() {
                var content = {
                    title: $scope.content.title,
                    contentType: $scope.content.contentType._id,
                    fields: $scope.content.contentType.fields
                };

                ContentService.save(
                    content,
                    function() {
                        toastr.success( $scope.content.title + ' saved' );
                        returnToContentListing();
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.content.title );
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
