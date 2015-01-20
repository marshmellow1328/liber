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
