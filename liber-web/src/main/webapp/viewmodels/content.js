define( ["knockout", 'liber/repository'], 
	function( ko, $, repository ) {
		var model = function() {
			var self = this;
			
			self.articles = ko.observableArray( [] );
			self.fields = ko.observableArray( [] );
	        self.filters = ko.observableArray( [] );
			
			self.addFilter = function( field, value ) {
				var filterValue = field.type == 'hierarchical' ? value.path : value.value;
				self.filters.push( { fieldName : field.name, value : filterValue } );
				self.applyFilters( self.filters() );
			};
			self.removeFilter = function( filter ) {
				self.filters.remove( filter );
				self.applyFilters( self.filters() );
			};
			self.applyFilters = function( filters ) {
				repository.retrieveArticlesWithFilters( filters, self.articles );
			}
			
			self.activate = function() {
				repository.retrieveFields( self.fields );
				repository.retrieveArticles( self.articles );
			}
		};
		return new model();
	}
);