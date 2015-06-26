angular.module( 'field-service', [ 'ngResource' ] ).factory(
    'FieldService',
    [
        '$resource',
        function( $resource ) {
            return $resource(
                '/api/fields/:fieldId',
                null,
                { 'update': { method: 'PUT' } }
            );
        }
    ]
);
