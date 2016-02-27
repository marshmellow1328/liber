var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateContentCtrl',
    function() {
        var $scope, CreateContentCtrl;

        var contentTypes = [
            {
                _id: 1,
                title: 'Blog'
            }
        ];

        var ContentService = {
            save: function( content, success, error ) {}
        };

        var ContentTypeService = {
            query: function( callback ) {
                callback( contentTypes );
            }
        };

        var content = {
            title: 'My Blog',
            contentType: {
                _id: 123,
                fields: [
                    {
                        type: 'text'
                    }
                ]
            }
        };

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-content-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        CreateContentCtrl = $controller(
                            'CreateContentCtrl', {
                                $scope: $scope,
                                $state: $state,
                                ContentService: ContentService,
                                ContentTypeService: ContentTypeService
                            }
                        );
                    }
                );

                spyOn( ContentTypeService, 'query' ).and.callThrough();
                spyOn( ContentService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should initialize content types when controller is initialized',
            function() {
                expect( $scope.contentTypes ).toBe( contentTypes );
            }
        );

        it( 'should call ContentService save with correct content object',
            function() {
                $scope.content = content;
                $scope.save();
                expect( ContentService.save ).toHaveBeenCalledWith(
                    {
                        title: 'My Blog',
                        contentType: 123,
                        fields: [
                            {
                                type: 'text'
                            }
                        ]
                    },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is successful',
            function() {
                $scope.content = content;
                ContentService.save = function( content, success, error ) {
                    success();
                }
                $scope.save();
                expect( toastr.success ).toHaveBeenCalledWith( 'My Blog saved' );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                $scope.content = content;
                ContentService.save = function( content, success, error ) {
                    error();
                }
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith( 'Failed to save My Blog' );
            }
        );

        it( 'should navigate to content listing when cancel function is called',
            function() {
                $scope.cancel();
                expect( $state.go ).toHaveBeenCalledWith( 'contentListing' );
            }
        );

        it( 'should be create mode',
            function() {
                expect( $scope.isCreateMode() ).toEqual( true );
            }
        );

        it( 'should not be view mode',
            function() {
                expect( $scope.isViewMode() ).toEqual( false );
            }
        );

        it( 'should not be edit mode',
            function() {
                expect( $scope.isEditMode() ).toEqual( false );
            }
        );

    }
);
