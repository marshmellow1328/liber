describe( 'ContentTypeListingCtrl',
    function() {
        var $scope;

        var contentTypes = [
            {
                _id: 454,
                type: 'Blog'
            }
        ];

        var ContentTypeService = {
            query: function() {
                return contentTypes;
            }
        };

        beforeEach(
            function() {
                module( 'content-type-listing-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        ContentTypeListingCtrl = $controller(
                            'ContentTypeListingCtrl', {
                                $scope: $scope,
                                ContentTypeService: ContentTypeService
                            }
                        );
                    }
                )
            }
        );

        it( 'should set content types when controller is initialized',
            function() {
                expect( $scope.contentTypes ).toBe( contentTypes );
            }
        );
    }
);
