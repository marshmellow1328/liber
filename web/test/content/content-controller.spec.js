describe( 'Content Controller', function() {
    // var scope, stateParams, state, ContentService, contentController;

    var _$scope, ContentController, _$stateParams;

    var _ContentService = {
        get: function( params, callback ) {
            callback(
                {
                    title: 'Blah',
                    contentType: 'Blog',
                    fields: [ 'Field1', 'Field2' ]
                }
            );
        }
    };

    // var _$stateParams = {
    //     id: function() {
    //         return 3;
    //     }
    // };

    beforeEach(
        module( 'content-controller' )
    );

    beforeEach(
        function() {
            _$stateParams = {
                id: 3
            };

            spyOn( _ContentService, 'get' ).and.callThrough();
        }
    );

    beforeEach(
        inject(
            function( $rootScope, $controller ) {
                _$scope = $rootScope.$new();
                ContentController = $controller(
                    'ContentCtrl', {
                        $scope: _$scope,
                        $stateParams: _$stateParams,
                        ContentService: _ContentService
                    }
                );
            }
        )
    );

    it( 'should retrieve content when controller is initialized', function() {
            expect( _ContentService.get ).toHaveBeenCalledWith(
                { contentId: 3 }, jasmine.any( Function )
            );
            expect( _$scope.content.title ).toBe( 'Blah' );
            expect( _$scope.content.fields ).toEqual( [ 'Field1', 'Field2' ] );
        }
    )

    it( 'should be view mode when controller is initialized', function() {
            expect( _$scope.isViewMode() ).toEqual( true );
            expect( _$scope.isEditMode() ).toEqual( false );
            expect( _$scope.isCreateMode() ).toEqual( false );
        }
    );

    it( 'should be edit mode when edit function is called', function() {
            _$scope.edit();
            expect( _$scope.isEditMode() ).toEqual( true );
            expect( _$scope.isViewMode() ).toEqual( false );
            expect( _$scope.isCreateMode() ).toEqual( false );
        }
    );

    it( 'should not be create mode', function() {
            expect( _$scope.isCreateMode() ).toEqual( false );
        }
    );
});
