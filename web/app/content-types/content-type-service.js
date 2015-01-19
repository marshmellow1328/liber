angular.module( 'content-type-service', [ 'ngResource' ] ).factory(
    'ContentTypeService',
    [
        '$resource',
        function( $resource ) {
            return $resource(
                '/api/content-types/:id',
                null,
                { 'update': { method: 'PUT' } }
            );
        }
    ]
);
