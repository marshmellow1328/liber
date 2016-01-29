var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateContentCtrl',
    function() {
        var _$scope, _CreateContentCtrl;

        var contentTypes = [
            {
                _id: 1,
                title: 'Blog'
            }
        ];

        var _ContentService = {
            save: function( content, success, error ) {}
        };

        var _ContentTypeService = {
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

        var _$state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-content-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        _CreateContentCtrl = $controller(
                            'CreateContentCtrl', {
                                $scope: _$scope,
                                $state: _$state,
                                ContentService: _ContentService,
                                ContentTypeService: _ContentTypeService
                            }
                        );
                    }
                );

                spyOn( _ContentTypeService, 'query' ).and.callThrough();
                spyOn( _ContentService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should initialize content types when controller is initialized',
            function() {
                expect( _$scope.contentTypes ).toBe( contentTypes );
            }
        );

        it( 'should call ContentService save with correct content object',
            function() {
                _$scope.content = content;
                _$scope.save();
                expect( _ContentService.save ).toHaveBeenCalledWith(
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
                _$scope.content = content;
                _ContentService.save = function( content, success, error ) {
                    success();
                }
                _$scope.save();
                expect( toastr.success ).toHaveBeenCalledWith( 'My Blog saved' );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                _$scope.content = content;
                _ContentService.save = function( content, success, error ) {
                    error();
                }
                _$scope.save();
                expect( toastr.error ).toHaveBeenCalledWith( 'Failed to save My Blog' );
            }
        );

        it( 'should navigate to content listing when cancel function is called',
            function() {
                _$scope.cancel();
                expect( _$state.go ).toHaveBeenCalledWith( 'contentListing' );
            }
        );

        it( 'should be create mode',
            function() {
                expect( _$scope.isCreateMode() ).toEqual( true );
            }
        );

        it( 'should not be view mode',
            function() {
                expect( _$scope.isViewMode() ).toEqual( false );
            }
        );

        it( 'should not be edit mode',
            function() {
                expect( _$scope.isEditMode() ).toEqual( false );
            }
        );

    }
);
