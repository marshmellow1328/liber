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
