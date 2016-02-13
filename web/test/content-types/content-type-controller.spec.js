var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'ContentTypeCtrl',
    function() {
        var $scope, ContentTypeCtrl;

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
                _id: 45,
                type: 'date'
            }
        ];

        var $stateParams = {
            id: 10
        };

        var ContentTypeService = {
            get: function( params ) {
                return contentType;
            },
            update: function( params, contentType, success, error ) {},
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
                module( 'content-type-controller' );

                spyOn( ContentTypeService, 'get' ).and.callThrough();
                spyOn( ContentTypeService, 'update' ).and.callThrough();
                spyOn( ContentTypeService, 'delete' ).and.callThrough();
                spyOn( FieldService, 'query' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        ContentTypeCtrl = $controller(
                            'ContentTypeCtrl', {
                                $scope: $scope,
                                $stateParams: $stateParams,
                                $state: $state,
                                ContentTypeService: ContentTypeService,
                                FieldService: FieldService
                            }
                        );
                    }
                );
            }
        );

        it( 'should populate content type when controller is initialized',
            function() {
                expect( ContentTypeService.get ).toHaveBeenCalledWith(
                    {
                        contentTypeId: 10
                    }
                );
                expect( $scope.contentType ).toEqual( contentType );
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

        it( 'should call ContentTypeService to update content type when save function is called',
            function() {
                $scope.save();
                expect( ContentTypeService.update ).toHaveBeenCalledWith(
                    { contentTypeId: 10 },
                    contentType,
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should call create toastr success message when save is successful',
            function() {
                ContentTypeService.update = function( id, content, success, error ) {
                    success();
                };
                $scope.save();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blog saved'
                );
            }
        );

        it( 'should call create toastr error message when save fails',
            function() {
                ContentTypeService.update = function( id, content, success, error ) {
                    error();
                };
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                   'Failed to save Blog'
                );
            }
        );

        it( 'should call ContentTypeService delete to delete content type',
            function() {
                $scope.delete();
                expect( ContentTypeService.delete ).toHaveBeenCalledWith(
                    { contentTypeId: 10 },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when delete is successful',
            function() {
                ContentTypeService.delete = function( id, success, error ) {
                    success();
                }
                $scope.delete();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blog deleted'
                );
            }
        );

        it( 'should create toastr error message when delete fails',
            function() {
                ContentTypeService.delete = function( id, success, error ) {
                    error();
                }
                $scope.delete();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to delete Blog'
                );
            }
        );

        it( 'should set mode to edit when edit function is called',
            function() {
                $scope.edit();
                expect( $scope.isEditMode() ).toEqual( true );
            }
        );

        it( 'should set mode to view when cancel function is called',
            function() {
                $scope.cancel();
                expect( $scope.isViewMode() ).toEqual( true );
            }
        );

        it( 'should not be create mode',
            function() {
                expect( $scope.isCreateMode() ).toEqual( false );
            }
        );
    }
);
