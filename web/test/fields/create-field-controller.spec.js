var toastr = {
    success: function( message ) {},
    error: function( message ) {}
};

describe( 'CreateFieldCtrl',
    function() {
        var $scope, CreateFieldCtrl;

        var FieldService = {
            save: function( field, success, error ) {}
        };

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'create-field-controller' );

                inject(
                    function( $rootScope, $controller ) {
                        $scope = $rootScope.$new();
                        CreateFieldCtrl = $controller(
                            'CreateFieldCtrl', {
                                $scope: $scope,
                                $state: $state,
                                FieldService: FieldService
                            }
                        );
                    }
                );

                spyOn( FieldService, 'save' ).and.callThrough();
                spyOn( toastr, 'success' );
                spyOn( toastr, 'error' );
            }
        );

        it( 'should add new empty value to field when add value function is called',
            function() {
                $scope.addValue();
                expect( $scope.field.values ).toEqual(
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
                $scope.field.values = [
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
                $scope.removeValue( 1 );
                expect( $scope.field.values ).toEqual(
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
                $scope.field = {
                    name: 'Author'
                };
                $scope.save();
                expect( FieldService.save ).toHaveBeenCalledWith(
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
                $scope.field = {
                    name: 'Author'
                };
                FieldService.save = function( field, success, error ) {
                    success();
                }
                $scope.save();
                expect( toastr.success ).toHaveBeenCalledWith( 'Author saved' );
            }
        );

        it( 'should create toastr error message when save fails',
            function() {
                $scope.field = {
                    name: 'Author'
                };
                FieldService.save = function( field, success, error ) {
                    error();
                }
                $scope.save();
                expect( toastr.error ).toHaveBeenCalledWith( 'Failed to save Author' );
            }
        );

        it( 'should navigate to field listing when cancel function is called',
            function() {
                $scope.cancel();
                expect( $state.go ).toHaveBeenCalledWith( 'fieldListing' );
            }
        );

        it( 'should navigate to field listing when save is succesful',
            function() {
                FieldService.save = function( field, success, error ) {
                    success();
                }
                $scope.save();
                expect( $state.go ).toHaveBeenCalledWith( 'fieldListing' );
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
