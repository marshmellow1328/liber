var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'ContentCtrl',
    function() {
        var _$scope, ContentCtrl, _$stateParams;

        var _ContentService = {
            get: function( params, callback ) {
                callback(
                    {
                        _id: 3,
                        title: 'Blah',
                        contentType: 'Blog',
                        fields: [ 'Field1', 'Field2' ]
                    }
                );
            },
            update: function( id, content, success, error ) {},
            delete: function( id, success, error ) {}
        };

        var _$state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'content-controller' )

                _$stateParams = {
                    id: 3
                };

                spyOn( _ContentService, 'get' ).and.callThrough();
                spyOn( _ContentService, 'update' ).and.callThrough();
                spyOn( _ContentService, 'delete' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        ContentCtrl = $controller(
                            'ContentCtrl', {
                                $scope: _$scope,
                                $stateParams: _$stateParams,
                                $state: _$state,
                                ContentService: _ContentService
                            }
                        );
                    }
                );
            }
        );

        it( 'should retrieve content when controller is initialized',
            function() {
                expect( _ContentService.get ).toHaveBeenCalledWith(
                    { contentId: 3 }, jasmine.any( Function )
                );
                expect( _$scope.content.title ).toBe( 'Blah' );
                expect( _$scope.content.fields ).toEqual( [ 'Field1', 'Field2' ] );
            }
        )

        it( 'should be view mode when controller is initialized',
            function() {
                expect( _$scope.isViewMode() ).toEqual( true );
                expect( _$scope.isEditMode() ).toEqual( false );
                expect( _$scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should be edit mode when edit function is called',
            function() {
                _$scope.edit();
                expect( _$scope.isEditMode() ).toEqual( true );
                expect( _$scope.isViewMode() ).toEqual( false );
                expect( _$scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should not be create mode',
            function() {
                expect( _$scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should call ContentService.update when save function is called',
            function() {
                _$scope.save();
                expect( _ContentService.update ).toHaveBeenCalledWith(
                    { contentId: 3 },
                    {
                        _id: 3,
                        title: 'Blah',
                        contentType: 'Blog',
                        fields: [ 'Field1', 'Field2' ]
                    },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is successful',
            function() {
                _ContentService.update = function( id, content, success, error ) {
                    success();
                };
                _$scope.save();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blah saved'
                );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                _ContentService.update = function( id, content, success, error ) {
                    error();
                };
                _$scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to save Blah'
                );
            }
        );

        it( 'should call ContentService.delete when delete function is called',
            function() {
                _$scope.delete();
                expect( _ContentService.delete ).toHaveBeenCalledWith(
                    { contentId: 3 },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when delete is successful',
            function() {
                _ContentService.delete = function( id, success, error ) {
                    success();
                };
                _$scope.delete();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blah deleted'
                );
                expect( _$state.go ).toHaveBeenCalledWith( 'contentListing' );
            }
        );

        it( 'should create toastr error message when delete fails',
            function() {
                _ContentService.delete = function( id, success, error ) {
                    error();
                };
                _$scope.delete();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to delete Blah'
                );
            }
        );
    }
);
