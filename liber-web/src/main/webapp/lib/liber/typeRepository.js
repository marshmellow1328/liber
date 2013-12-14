define( ['jquery'], function( jquery ) {
	var model = function() {
		var self = this;
		
		self.baseUrl = '/liber-services/types';
		self.deleteVerb = 'DELETE';
		self.postVerb = 'POST';
		self.putVerb = 'PUT';
		self.jsonContentType = 'application/json';
		
		self.retrieveTypes = function( successCallback ) {
			jquery.getJSON( self.baseUrl, successCallback );
		}
		
		self.retrieveType = function( id, successCallback ) {
			jquery.getJSON( self.baseUrl + '/' + id, successCallback );
		}
		
		self.createType = function( type, successCallback ) {
			jquery.ajax(
				{
					url: self.baseUrl, 
					type: self.postVerb, 
					data: JSON.stringify( type ), 
					success: successCallback, 
					contentType: self.jsonContentType
				}
			);
		};
		
		self.deleteType = function( id, successCallback ) {
			jquery.ajax(
				{
					url: self.baseUrl + '/' + id,
					type: self.deleteVerb,
					success: successCallback
				}
			);
		};
		
		self.updateType = function( type, successCallback ) {
			jquery.ajax(
				{
					url: self.baseUrl + '/' + type.id, 
					type: self.putVerb, 
					data: JSON.stringify( type ), 
					success: successCallback, 
					contentType: self.jsonContentType
				}
			);
		};
	};
	return new model();
});