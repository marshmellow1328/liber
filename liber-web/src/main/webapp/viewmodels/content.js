define( ["knockout", "jquery"], 
	function( ko, $ ) {
		var model = function() {
			var self = this;
			
			self.articles = ko.observableArray( [] );
			self.fields = ko.observableArray( [] );
	        self.filters = ko.observableArray( [] );
			
			self.successfulCreates = ko.observableArray( [] );
			self.successfulDeletes = ko.observableArray( [] );
			
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
			
			self.deleteArticle = function( article ) {
				$.ajax(
					{
						url: "/liber-services/articles/" + article.id, 
						type: "DELETE", 
						success: function() {
							self.goToTagListing();
							self.articles.remove( 
									function( item ) { return item.id == self.activeArticle().id; } );
							self.successfulDeletes.push( self.activeArticle() );
							self.activeArticle( { name: "", content: "" } );
						}
					}
				);
			};
			
			$.getJSON( "/liber-services/fields", self.fields );
			$.getJSON( "/liber-services/articles", self.articles );
		};
		return new model();
	}
);