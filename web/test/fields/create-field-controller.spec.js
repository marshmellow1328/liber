var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateFieldCtrl',
    function() {
        var _$scope, CreateFieldCtrl;

        var _FieldService = {
            save: function( field, success, error ) {}
        };

        var _$state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-field-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        _$scope = $rootScope.$new();
                        CreateFieldCtrl = $controller(
                            'CreateFieldCtrl', {
                                $scope: _$scope,
                                $state: _$state,
                                FieldService: _FieldService
                            }
                        );
                    }
                );

                spyOn( _FieldService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should add new empty value to field when add value function is called',
            function() {
                _$scope.addValue();
                expect( _$scope.field.values ).toEqual(
                    [
                        {
                            value: ''
                        }
                    ]
                );
            }
        );

        it( 'should remove field value at index when remove value function is called',
            function() {
                _$scope.field.values = [
                    {
                        value: 'A'
                    },
                    {
                        value: 'B'
                    },
                    {
                        value: 'C'
                    }
                ];
                _$scope.removeValue( 1 );
                expect( _$scope.field.values ).toEqual(
                    [
                        {
                            value: 'A'
                        },
                        {
                            value: 'C'
                        }
                    ]
                );
            }
        );

        it( 'should call FieldService to save field when save is function is called',
            function() {
                _$scope.field = {
                    name: 'Author'
                };
                _$scope.save();
                expect( _FieldService.save ).toHaveBeenCalledWith(
                    {
                        name: 'Author'
                    },
                    jasmine.any( Function ),
                    jasmine.any( Function )
                );
            }
        );

        it( 'should create toastr success message when save is succesful',
            function() {
                _$scope.field = {
                    name: 'Author'
                };
                _FieldService.save = function( field, success, error ) {
                    success();
                }
                _$scope.save();
                expect( toastr.success ).toHaveBeenCalledWith( 'Author saved' );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                _$scope.field = {
                    name: 'Author'
                };
                _FieldService.save = function( field, success, error ) {
                    error();
                }
                _$scope.save();
                expect( toastr.error ).toHaveBeenCalledWith( 'Failed to save Author' );
            }
        );

        it( 'should navigate to field listing when cancel function is called',
            function() {
                _$scope.cancel();
                expect( _$state.go ).toHaveBeenCalledWith( 'fieldListing' );
            }
        );

        it( 'should navigate to field listing when save is succesful',
            function() {
                _FieldService.save = function( field, success, error ) {
                    success();
                }
                _$scope.save();
                expect( _$state.go ).toHaveBeenCalledWith( 'fieldListing' );
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
