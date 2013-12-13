define( ['jquery'], function( jquery ) {
	var model = function() {
		var self = this;
		
		self.baseUrl = '/liber-services';
		self.articlesUrl = self.baseUrl + '/articles';
		self.fieldsUrl = self.baseUrl + '/fields';
		
		self.queryStringStart = '?';
		self.queryStringAssignment = '=';
		self.queryStringDelimiter = '&';
		
		self.retrieveArticles = function( successCallback ) {
			self.retrieveArticlesWithFilters( [], successCallback );
		}
		self.retrieveArticlesWithFilters = function( filters, successCallback ) {
			var url = self.articlesUrl + self.queryStringStart;
			for( var i = 0; i < filters.length; i++ ) {
				var filter = filters[i];
				url += filter.fieldName + self.queryStringAssignment + 
						filter.value + self.queryStringDelimiter;
			}
			jquery.getJSON( url, successCallback );
		}
		
		self.retrieveFields = function( successCallback ) {
			jquery.getJSON( self.fieldsUrl, successCallback );
		}
	};
	return new model();
} );