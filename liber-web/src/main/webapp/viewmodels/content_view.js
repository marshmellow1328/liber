define( [], 
	function() {
		var model = function() {
			var self = this;

			self.name = ko.observable();
			self.content = ko.observable();
			self.fields = ko.observableArray( [] );
			
			self.activate = function( id ) {
				$.getJSON( "/liber-services/articles/" + id, 
							function( article ) { 
								self.name( article.name );
								self.content( article.content );
								self.fields( article.fields );
							}
				);
			}
		};
		return new model();
	}
);