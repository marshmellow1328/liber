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
		
		$scope.delete = function() {
			FieldService.delete( { id: $scope.field._id } );
		}
	})
	.controller( 'EditFieldCtrl', function( $scope, $routeParams, $location, FieldService ) {
		var fieldId = $routeParams.id;
		$scope.isEditMode = fieldId != null;
		
		if ( $scope.isEditMode ) {
			FieldService.get({ id: fieldId }, function(field) {
				$scope.field = field;
			});
		}
		else {
			$scope.field = {};
			$scope.field.values = [];
		}
		
		$scope.addValue = function() {
			$scope.field.values.push( { "value": "" } );
		}
		
		$scope.removeValue = function( index ) {
			$scope.field.values.splice(index, 1);
		}
		
		$scope.save = function() {
			if ($scope.isEditMode) {
				FieldService.update( { id: $scope.field._id }, $scope.field );
			}
			else {
				FieldService.save( $scope.field, function( response ) {
					var url = '/viewField/' + response._id;
				    $location.path(url);
				});
				
			}
		}
	})
	.controller( 'ContentTypesCtrl', function( $scope, ContentTypeService ) {
		$scope.setContentTypes = function() {
			ContentTypeService.query( function( contentTypes ) {
				$scope.contentTypes = contentTypes;
			});
		}
		
		$scope.setContentTypes();
	})
	.controller( 'ViewContentTypeCtrl', function( $scope, $routeParams, ContentTypeService ) {
		var contentTypeId = $routeParams.id;
	
		ContentTypeService.get({ id: contentTypeId }, function( contentType ) {
			$scope.contentType = contentType;
		});
		
		$scope.delete = function() {
			ContentTypeService.delete( { id: $scope.contentType._id } );
		}
	})
	.controller( 'EditContentTypeCtrl', function( $scope, $routeParams, $location, ContentTypeService, FieldService ) {
		var contentTypeId = $routeParams.id;
		$scope.isEditMode = contentTypeId != null;
	
		if ( $scope.isEditMode ) {
			ContentTypeService.get({ id: contentTypeId }, function( contentType ) {
				$scope.contentType = contentType;
			});
		}
		else {
			$scope.contentType = {};
			$scope.contentType.fields = [];
		}
		
		FieldService.query({}, function( fields ) {
			$scope.fieldOptions = fields;
		});
		
		$scope.addField = function() {
			$scope.contentType.fields.push( { } );
		}
		
		$scope.removeField = function( index ) {
			$scope.contentType.fields.splice( index, 1 );
		}
		
		$scope.save = function() {
			if ($scope.isEditMode) {
				ContentTypeService.update( { id: $scope.contentType._id }, $scope.contentType, function( response ) {
					redirectToViewContentType( response._id );
				});
			}
			else {
				ContentTypeService.save( $scope.contentType, function( response ) {
					redirectToViewContentType( response._id );
				});
				
			}
		}
		
		var redirectToViewContentType = function( id ) {
			var url = '/viewContentType/' + id;
		    $location.path( url );
		}
	});