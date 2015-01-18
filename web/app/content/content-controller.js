angular.module( 'content-controller', [] )
	.controller( 'ContentCtrl', [ 'ContentService', function( $scope, ContentService ) {
        $scope.content = [
            {
                title: 'Blah content',
                author: 'Jessa',
                body: 'Hi, this is my first blog post'
            }
        ];
	} ] );
