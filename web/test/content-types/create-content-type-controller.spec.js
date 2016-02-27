var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateContentTypeCtrl',
    function() {
        var $scope, $state;

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

        var ContentTypeService = {
            get: function( params ) {
                return contentType;
            },
            save: function( contentType, success, error ) {},
            delete: function( params, success, error ) {}
        };

        var FieldService = {
            query: function( params, callback ) {
                callback( fields );
            }
        };

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-content-type-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        CreateContentTypeCtrl = $controller(
                            'CreateContentTypeCtrl', {
                                $scope: $scope,
                                $state: $state,
                                ContentTypeService: ContentTypeService,
                                FieldService: FieldService
                            }
                        );
                    }
                );

                spyOn( ContentTypeService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should populate field options when controller is initialized',
            function() {
                expect( $scope.fieldOptions ).toEqual( fields );
            }
        );

        it( 'should add new empty field to content type when add field function is called',
            function() {
                $scope.addField();
                expect( $scope.contentType.fields ).toEqual( [ {} ] );
            }
        );

        it( 'should remove field at specified index when remove field function is called',
            function() {
                $scope.contentType.fields = [
                    {
                        _id: 3434
                    }
                ]
                $scope.removeField( 0 );
                expect( $scope.contentType.fields ).toEqual( [] );
            }
        );

        it( 'should call ContentTypeService to save content type',
            function() {
                $scope.contentType = contentType;
                $scope.save();
                expect( ContentTypeService.save ).toHaveBeenCalledWith(
                    contentType,
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is successful',
            function() {
                ContentTypeService.save = function( contentType, success, error ) {
                   success();
                };
               $scope.contentType.name = 'Tutorial';
               $scope.save();
               expect( toastr.success ).toHaveBeenCalledWith(
                   'Tutorial saved'
               );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                ContentTypeService.save = function( contentType, success, error ) {
                   error();
                };
                $scope.contentType.name = 'Tutorial';
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                   'Failed to save Tutorial'
                );
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
