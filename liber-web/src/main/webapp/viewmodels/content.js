define( ["knockout", "jquery"], 
	function( ko, $ ) {
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
				var url = "/liber-services/articles?";
				for( var i = 0; i < filters.length; i++ ) {
					var filter = filters[i];
					url += filter.fieldName + "=" + filter.value + "&";
				}
				$.getJSON( url, self.articles );
			}
			
			self.activate = function() {
				$.getJSON( "/liber-services/fields", self.fields );
				$.getJSON( "/liber-services/articles", self.articles );
			}
		};
		return new model();
	}
);