define( ['knockout', 'toastr', 'plugins/router'], 
	function( ko, toastr, router ) {
		var model = function() {
			var self = this;

			self.id = ko.observable();
			self.name = ko.observable();
			self.content = ko.observable();
			self.fields = ko.observableArray( [] );
			
			self.deleteArticle = function( article ) {
				$.ajax(
					{
						url: "/liber-services/articles/" + self.id(), 
						type: "DELETE", 
						success: function() {
							toastr.success( 'Successfully deleted ' + self.name() );
							router.navigate( '' );
						}
					}
				);
			};
			
			self.activate = function( id ) {
				$.getJSON( "/liber-services/articles/" + id, 
							function( article ) { 
								self.id( id );
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