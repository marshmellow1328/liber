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
		
	})
	.controller('FieldsCtrl', function($scope, FieldService) {
		$scope.setFields = function() {
			FieldService.query(function(fields) {
				$scope.fields = fields;
			});
		}
		
		$scope.setFields();
	})
	.controller('ViewFieldCtrl', function($scope, $routeParams, FieldService) {
		var fieldId = $routeParams.id;
		
		FieldService.get({ id: fieldId }, function(field) {
			$scope.field = field;
		});
		
		$scope.addValue = function() {
			$scope.field.values.push( { "value": "" } );
		}
		
		$scope.removeValue = function( index ) {
			$scope.field.values.splice(index, 1);
		}
		
		$scope.save = function() {
			FieldService.update( { id: $scope.field._id }, $scope.field );
		}
		
		$scope.delete = function() {
			FieldService.delete( { id: $scope.field._id } );
		}
	});