describe( 'ContentTypeListingCtrl',
    function() {
        var _$scope;

        var contentTypes = [
            {
                _id: 454,
                type: 'Blog'
            }
        ];

        var _ContentTypeService = {
            query: function() {
                return contentTypes;
            }
        };

        beforeEach(
            function() {
                module( 'content-type-listing-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        _ContentTypeListingCtrl = $controller(
                            'ContentTypeListingCtrl', {
                                $scope: _$scope,
                                ContentTypeService: _ContentTypeService
                            }
                        );
                    }
                )
            }
        );

        it( 'should set content types when controller is initialized',
            function() {
                expect( _$scope.contentTypes ).toBe( contentTypes );
            }
        );
    }
);
