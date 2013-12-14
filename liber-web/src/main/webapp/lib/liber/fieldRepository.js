define( ['jquery'], function( jquery ) {
	var model = function() {
		var self = this;
		
		self.baseUrl = '/liber-services/fields';
		self.deleteVerb = 'DELETE';
		self.postVerb = 'POST';
		self.putVerb = 'PUT';
		self.jsonContentType = 'application/json';
		
		self.retrieveFields = function( successCallback ) {
			jquery.getJSON( self.baseUrl, successCallback );
		};
		
		self.createField = function( field, successCallback ) {
			jquery.ajax(
				{
					url: self.baseUrl, 
					type: self.postVerb, 
					data: JSON.stringify( field ), 
					success: successCallback, 
					contentType: self.jsonContentType
				}
			);
		};
	};
	return new model();
} );