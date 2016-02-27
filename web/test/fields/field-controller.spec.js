var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'FieldCtrl',
    function() {
        var $scope, FieldCtrl;

        var $stateParams = {
            id: 3432
        };

        var field = {
            _id: 3432,
            name: 'Author',
            type: 'text'
        };

        var FieldService = {
            get: function( params ) {
                return field;
            },
            update: function( params, field, success, error ) {},
            delete: function( params, success, error ) {}
        };

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'field-controller' );

                spyOn( FieldService, 'get' ).and.callThrough();
                spyOn( FieldService, 'update' ).and.callThrough();
                spyOn( FieldService, 'delete' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        FieldCtrl = $controller(
                            'FieldCtrl', {
                                $scope: $scope,
                                $stateParams: $stateParams,
                                $state: $state,
                                FieldService: FieldService
                            }
                        );
                    }
                );
            }
        );

        it( 'should retrieve field when controller is initialized',
            function() {
                expect( FieldService.get ).toHaveBeenCalledWith(
                    { fieldId: 3432 }
                );
                expect( $scope.field ).toEqual( field );
            }
        );

        it( 'should call FieldService to update field when save function is called',
            function() {
                $scope.save();
                expect( FieldService.update ).toHaveBeenCalledWith(
                    { fieldId: 3432 },
                    field,
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is successful',
            function() {
                FieldService.update = function( id, field, success, error ) {
                    success();
                };
                $scope.save();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Author saved'
                );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                FieldService.update = function( id, field, success, error ) {
                    error();
                };
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to save Author'
                );
            }
        );

        it( 'should call FieldService to delete field when delete function is called',
            function() {
                $scope.delete();
                expect( FieldService.delete ).toHaveBeenCalledWith(
                    { fieldId: 3432 },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when delete is successful',
            function() {
                FieldService.delete = function( id, success, error ) {
                    success();
                }
                $scope.delete();
                expect( toastr.success ).toHaveBeenCalledWith(
                    'Author deleted'
                );
            }
        );

        it( 'should create toastr error message when delete fails',
            function() {
                FieldService.delete = function( id, success, error ) {
                    error();
                }
                $scope.delete();
                expect( toastr.error ).toHaveBeenCalledWith(
                    'Failed to delete Author'
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
