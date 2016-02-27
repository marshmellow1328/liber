describe( 'ContentListingCtrl',
    function() {
        var $scope, ContentListingCtrl;

        var content = [
            {
                _id: 1234,
                title: 'Blah'
            },
            {
                _id: 5678,
                title: 'Whatever'
            }
        ];

        var ContentService = {
            query: function() {
                return content;
            }
        };

        var ContentTypeService = {
            query: function( callback ) {
                callback();
            }
        };

        beforeEach(
            function() {
                module( 'content-listing-controller' );

                spyOn( ContentService, 'query' ).and.callThrough();
                spyOn( ContentTypeService, 'query' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        ContentListingCtrl = $controller(
                            'ContentListingCtrl', {
                                $scope: $scope,
                                ContentService: ContentService,
                                ContentTypeService: ContentTypeService
                            }
                        );
                    }
                );
            }
        );

        it( 'should set content when controller is initialized',
            function() {
                expect( $scope.content ).toBe( content );
                expect( ContentService.query ).toHaveBeenCalled();
            }
        )

        it( 'should return true when no content type filter is defined',
            function() {
                content = {
                    contentType: "72343"
                }
                expect( $scope.filterByContentType() ).toBe( true );
            }
        );

        it( 'should return true when content type matches filter',
            function() {
                $scope.contentTypeFilter = {
                    _id: "72343"
                };
                content = {
                    contentType: "72343"
                }
                expect( $scope.filterByContentType( content ) ).toBe( true );
            }
        );

        it( 'should return false when content type does not match filter',
            function() {
                $scope.contentTypeFilter = {
                    _id: "72356"
                };
                content = {
                    contentType: "72343"
                }
                expect( $scope.filterByContentType( content ) ).toBe( false );
            }
        );

        it( 'should clear content type filter',
            function() {
                $scope.clearFilter();
                expect( $scope.contentTypeFilter ).toBe( null );
            }
        );
    }
)
