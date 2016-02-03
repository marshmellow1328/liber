var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateContentTypeCtrl',
    function() {
        var _$scope, _$state;

        var contentType = {
            _id: 10,
            name: 'Blog',
            fields: []
        };

        var fields = [
            {
                _id: 12,
                type: 'text'
            },
            {
                id: 45,
                type: 'date'
            }
        ];

        var _ContentTypeService = {
            get: function( params ) {
                return contentType;
            },
            save: function( contentType, success, error ) {},
            delete: function( params, success, error ) {}
        };

        var _FieldService = {
            query: function( params, callback ) {
                callback( fields );
            }
        };

        var _$state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-content-type-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        CreateContentTypeCtrl = $controller(
                            'CreateContentTypeCtrl', {
                                $scope: _$scope,
                                $state: _$state,
                                ContentTypeService: _ContentTypeService,
                                FieldService: _FieldService
                            }
                        );
                    }
                );

                spyOn( _ContentTypeService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should populate field options when controller is initialized',
            function() {
                expect( _$scope.fieldOptions ).toEqual( fields );
            }
        );

        it( 'should add new empty field to content type when add field function is called',
            function() {
                _$scope.addField();
                expect( _$scope.contentType.fields ).toEqual( [ {} ] );
            }
        );

        it( 'should remove field at specified index when remove field function is called',
            function() {
                _$scope.contentType.fields = [
                    {
                        _id: 3434
                    }
                ]
                _$scope.removeField( 0 );
                expect( _$scope.contentType.fields ).toEqual( [] );
            }
        );

        it( 'should call ContentTypeService to save content type',
            function() {
                _$scope.contentType = contentType;
                _$scope.save();
                expect( _ContentTypeService.save ).toHaveBeenCalledWith(
                    contentType,
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is successful',
            function() {
                _ContentTypeService.save = function( contentType, success, error ) {
                   success();
                };
               _$scope.contentType.name = 'Tutorial';
               _$scope.save();
               expect( toastr.success ).toHaveBeenCalledWith(
                   'Tutorial saved'
               );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                _ContentTypeService.save = function( contentType, success, error ) {
                   error();
                };
                _$scope.contentType.name = 'Tutorial';
                _$scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                   'Failed to save Tutorial'
                );
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
