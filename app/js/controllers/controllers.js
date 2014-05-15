angular.module('controllers', [])
	.controller('ContentCtrl', function($scope, ContentService) {
		$scope.setContent = function() {
			ContentService.query(function(content) {
				$scope.content = content;
			});
		}
		
		$scope.setContent(); 
	})
	.controller('ViewContentCtrl', function($scope, $routeParams, ContentService) {
		var contentId = $routeParams.id;
		
		ContentService.get({ id: contentId }, function(content) {
			$scope.content = content;
		});
	})
	.controller('CreateContentCtrl', function($scope, ContentService) {
		
	});