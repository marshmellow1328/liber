angular.module( 'createContent-controller', [] ).controller(
    'CreateContentCtrl',
    [
        '$scope',
        '$state',
        'ContentService',
        function( $scope, $state, ContentService ) {
            $scope.content = {};

            $scope.save = function() {
                ContentService.save(
                    $scope.content,
                    function() {
                        toastr.success( $scope.content.title + ' saved' );
                        $state.go( 'content' );
                    },
                    function() {
                        toastr.error( 'Failed to save ' + $scope.content.title );
                    }
                );
            };

        }
    ]
);
