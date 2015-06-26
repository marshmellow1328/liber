angular.module( 'content-controller', [] ).controller(
    'ContentCtrl',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentService',
        function( $scope, $stateParams, $state, ContentService ) {
            var mode = 'view';

            ContentService.get(
                { contentId: $stateParams.id },
                function( content ) {
                    $scope.content = content;
                    $scope.content.contentType.fields = content.fields;
                }
            );

            $scope.save = function() {
                ContentService.update(
                    { contentId: $scope.content._id },
                    $scope.content,
                    function() {
                        toastr.success( $scope.content.title + ' saved' );
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.content.title );
                    }
                );
            };

            $scope.delete = function() {
                ContentService.delete(
                    { contentId: $scope.content._id },
                    function() {
                        toastr.success( $scope.content.title + ' deleted' );
                        $state.go( 'contentListing' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.content.title );
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
