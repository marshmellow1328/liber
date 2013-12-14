define( ['jquery'], function( jquery ) {
	var model = function() {
		var self = this;
		
		self.baseUrl = '/liber-services/types';
		self.postVerb = 'POST';
		self.jsonContentType = 'application/json';
		
		self.retrieveTypes = function( successCallback ) {
			jquery.getJSON( self.baseUrl, successCallback );
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
	};
	return new model();
});