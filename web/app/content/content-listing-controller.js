angular.module( 'content-listing-controller', [] ).controller(
    'ContentListingCtrl',
    [
        '$scope',
        'ContentService',
        'ContentTypeService',
        function( $scope, ContentService, ContentTypeService ) {
            $scope.content = ContentService.query();
            ContentTypeService.query(
                function( contentTypes ) {
                    $scope.contentTypes = contentTypes;
                }
            );

            $scope.filterByContentType = function(content) {
                return !$scope.contentTypeFilter || $scope.contentTypeFilter._id === content.contentType
            }

            $scope.clearFilter = function() {
                $scope.contentTypeFilter = null;
            }
	   }
    ]
);
