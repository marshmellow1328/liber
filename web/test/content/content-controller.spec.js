var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'ContentCtrl',
    function() {
        var $scope, ContentCtrl, $stateParams;

        var ContentService = {
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

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'content-controller' )

                $stateParams = {
                    id: 3
                };

                spyOn( ContentService, 'get' ).and.callThrough();
                spyOn( ContentService, 'update' ).and.callThrough();
                spyOn( ContentService, 'delete' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        ContentCtrl = $controller(
                            'ContentCtrl', {
                                $scope: $scope,
                                $stateParams: $stateParams,
                                $state: $state,
                                ContentService: ContentService
                            }
                        );
                    }
                );
            }
        );

        it( 'should retrieve content when controller is initialized',
            function() {
                expect( ContentService.get ).toHaveBeenCalledWith(
                    { contentId: 3 }, jasmine.any( Function )
                );
                expect( $scope.content.title ).toBe( 'Blah' );
                expect( $scope.content.fields ).toEqual( [ 'Field1', 'Field2' ] );
            }
        )

        it( 'should be view mode when controller is initialized',
            function() {
                expect( $scope.isViewMode() ).toEqual( true );
                expect( $scope.isEditMode() ).toEqual( false );
                expect( $scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should be edit mode when edit function is called',
            function() {
                $scope.edit();
                expect( $scope.isEditMode() ).toEqual( true );
                expect( $scope.isViewMode() ).toEqual( false );
                expect( $scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should not be create mode',
            function() {
                expect( $scope.isCreateMode() ).toEqual( false );
            }
        );

        it( 'should call ContentService.update when save function is called',
            function() {
                $scope.save();
                expect( ContentService.update ).toHaveBeenCalledWith(
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
                ContentService.update = function( id, content, success, error ) {
                    success();
                };
                $scope.save();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blah saved'
                );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                ContentService.update = function( id, content, success, error ) {
                    error();
                };
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to save Blah'
                );
            }
        );

        it( 'should call ContentService.delete when delete function is called',
            function() {
                $scope.delete();
                expect( ContentService.delete ).toHaveBeenCalledWith(
                    { contentId: 3 },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when delete is successful',
            function() {
                ContentService.delete = function( id, success, error ) {
                    success();
                };
                $scope.delete();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blah deleted'
                );
                expect( $state.go ).toHaveBeenCalledWith( 'contentListing' );
            }
        );

        it( 'should create toastr error message when delete fails',
            function() {
                ContentService.delete = function( id, success, error ) {
                    error();
                };
                $scope.delete();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to delete Blah'
                );
            }
        );
    }
);
