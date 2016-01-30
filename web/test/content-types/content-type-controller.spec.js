var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'ContentTypeCtrl',
    function() {
        var _$scope, ContentTypeCtrl, _$stateParams;

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
            update: function( params, contentType, success, error ) {},
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
                module( 'content-type-controller' );

                _$stateParams = {
                    id: 10
                };

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        ContentTypeCtrl = $controller(
                            'ContentTypeCtrl', {
                                $scope: _$scope,
                                $stateParams: _$stateParams,
                                $state: _$state,
                                ContentTypeService: _ContentTypeService,
                                FieldService: _FieldService
                            }
                        );
                    }
                );

                spyOn( _ContentTypeService, 'get' ).and.callThrough();
                spyOn( _ContentTypeService, 'update' ).and.callThrough();
                spyOn( _ContentTypeService, 'delete' ).and.callThrough();
                spyOn( _FieldService, 'query' ).and.callThrough();
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

        it( 'should call ContentTypeService to update content type',
            function() {
                _$scope.save();
                expect( _ContentTypeService.update ).toHaveBeenCalledWith(
                    { contentTypeId: 10 },
                    contentType,
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should call create toastr success message when save is successful',
            function() {
                _ContentTypeService.update = function( id, content, success, error ) {
                       success();
                   };
                   _$scope.save();
                   expect( toastr.success ).toHaveBeenCalledWith(
                       'Blog saved'
                   );
            }
        );

        it( 'should call create toastr error message when save fails',
            function() {
                _ContentTypeService.update = function( id, content, success, error ) {
                       error();
                   };
                   _$scope.save();
                   expect( toastr.error ).toHaveBeenCalledWith(
                       'Failed to save Blog'
                   );
            }
        );

        it( 'should call ContentTypeService delete to delete content type',
            function() {
                _$scope.delete();
                expect( _ContentTypeService.delete ).toHaveBeenCalledWith(
                    { contentTypeId: 10 },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when delete is successful',
            function() {
                _ContentTypeService.delete = function( id, success, error ) {
                    success();
                }
                _$scope.delete();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Blog deleted'
                );
            }
        );

        it( 'should create toastr error message when delete fails',
            function() {
                _ContentTypeService.delete = function( id, success, error ) {
                    error();
                }
                _$scope.delete();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to delete Blog'
                );
            }
        );

        it( 'should set mode to edit when edit function is called',
            function() {
                _$scope.edit();
                expect( _$scope.isEditMode() ).toEqual( true );
            }
        );

        it( 'should set mode to view when cancel function is called',
            function() {
                _$scope.cancel();
                expect( _$scope.isViewMode() ).toEqual( true );
            }
        );

        it( 'should not be create mode',
            function() {
                expect( _$scope.isCreateMode() ).toEqual( false );
            }
        );
    }
);
