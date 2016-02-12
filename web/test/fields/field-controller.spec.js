describe( 'FieldCtrl',
    function() {
        var $scope, FieldCtrl;

        var $stateParams = {
            id: 3432
        };

        var FieldService = {
            get: function( params ) {
                return {
                    _id: 3432,
                    type: 'text'
                };
            }
        };

        var $state = jasmine.createSpyObj( '$state', [ 'go' ] );

        beforeEach(
            function() {
                module( 'field-controller' );

                spyOn( FieldService, 'get' ).and.callThrough();

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
                    {
                        fieldId: 3432
                    }
                );
                expect( $scope.field ).toEqual(
                    {
                        _id: 3432,
                        type: 'text'
                    }
                );
            }
        );
    }
);
