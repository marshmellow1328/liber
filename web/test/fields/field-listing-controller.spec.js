describe( 'FieldCtrl',
    function() {
        var $scope, FieldListingCtrl;

        var fields = [
            {
                _id: 123,
                name: 'Author',
                type: 'text'
            },
            {
                _id: 456,
                name: 'Title',
                type: 'text'
            }
        ];

        var FieldService = {
            query: function() {
                return fields;
            }
        }

        beforeEach(
            function() {
                module( 'field-listing-controller' );

                spyOn( FieldService, 'query' ).and.callThrough();

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        FieldListingCtrl = $controller(
                            'FieldListingCtrl', {
                                $scope: $scope,
                                FieldService: FieldService
                            }
                        );
                    }
                );
            }
        );

        it( 'should call FieldService to retrieve field when controller is initialized',
            function() {
                expect( FieldService.query ).toHaveBeenCalled();
            }
        );

        it( 'should set fields when controller is initialized',
            function() {
                expect( $scope.fields ).toEqual( fields );
            }
        );

    }
);
