describe( 'ContentListingCtrl',
    function() {
        var _$scope, _ContentListingCtrl;

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

        var _ContentService = {
            query: function() {
                return content;
            }
        };

        var _ContentTypeService = {
            query: function( callback ) {
                callback();
            }
        };

        beforeEach(
            function() {
                module( 'content-listing-controller' );

                spyOn( _ContentService, 'query' ).and.callThrough();
                spyOn( _ContentTypeService, 'query' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        ContentListingCtrl = $controller(
                            'ContentListingCtrl', {
                                $scope: _$scope,
                                ContentService: _ContentService,
                                ContentTypeService: _ContentTypeService
                            }
                        );
                    }
                );
            }
        );

        it( 'should set content when controller is initialized',
            function() {
                expect( _$scope.content ).toBe( content );
                expect( _ContentService.query ).toHaveBeenCalled();
            }
        )

        it( 'should return true when no content type filter is defined',
            function() {
                content = {
                    contentType: "72343"
                }
                expect( _$scope.filterByContentType() ).toBe( true );
            }
        );

        it( 'should return true when content type matches filter',
            function() {
                _$scope.contentTypeFilter = {
                    _id: "72343"
                };
                content = {
                    contentType: "72343"
                }
                expect( _$scope.filterByContentType( content ) ).toBe( true );
            }
        );

        it( 'should return false when content type does not match filter',
            function() {
                _$scope.contentTypeFilter = {
                    _id: "72356"
                };
                content = {
                    contentType: "72343"
                }
                expect( _$scope.filterByContentType( content ) ).toBe( false );
            }
        );

        it( 'should clear content type filter',
            function() {
                _$scope.clearFilter();
                expect( _$scope.contentTypeFilter ).toBe( null );
            }
        );
    }
)
