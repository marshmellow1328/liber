angular.module( 'edit-content-type-controller', [] ).controller(
    'EditContentTypeController',
    [
        '$scope',
        '$stateParams',
        '$state',
        'ContentTypeService',
        'FieldService',
        function( $scope, $stateParams, $state, ContentTypeService, FieldService ) {
            $scope.type = ContentTypeService.get( { id: $stateParams.id } );

            FieldService.query(
                {},
                function( fields ) {
                    $scope.fieldOptions = fields;
                }
            );
        }
    ]
);
