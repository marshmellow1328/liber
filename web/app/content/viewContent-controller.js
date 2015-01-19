angular.module( 'viewContent-controller', [] ).controller(
    'ViewContentCtrl',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentService',
        function( $scope, $stateParams, $state, ContentService ) {
            $scope.content = ContentService.get( { contentId: $stateParams.id } );

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
                        $state.go( 'content' );
                    },
                    function() {
                        toastr.error( 'Failed to delete ' + $scope.content.title );
                    }
                );
            };

            $scope.cancelEdit = function() {
                $scope.isEditMode = false;
            };

        }
    ]
);
