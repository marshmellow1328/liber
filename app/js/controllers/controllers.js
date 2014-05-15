angular.module('controllers', [])
	.controller('ContentCtrl', function($scope, ContentService) {
		$scope.setContent = function() {
			ContentService.query(function(content) {
				$scope.content = content;
			});
		}
		
		$scope.setContent(); 
		/*$scope.content = [
		                  	{ title: 'Blah' },
		                  	{ title: 'Blah 2' }
		                  ];*/
	});