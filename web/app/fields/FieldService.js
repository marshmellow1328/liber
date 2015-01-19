angular.module( 'FieldService', [ 'ngResource' ] ).factory(
    'FieldService',
    [
        '$resource',
        function( $resource ) {
            return $resource(
                '/api/fields/:id',
                null,
                { 'update': { method: 'PUT' } }
            );
        }
    ]
);
