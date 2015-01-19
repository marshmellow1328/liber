angular.module( 'content-types-controller', [] ).controller(
    'ContentTypesController',
    [
        '$scope',
        'ContentTypeService',
        function( $scope, ContentTypeService ) {
            $scope.contentTypes = ContentTypeService.query();
        }
    ]
);
