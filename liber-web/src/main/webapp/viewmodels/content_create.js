define( [], 
	function() {
		var model = function() {
			var self = this;
			
			self.ArticleForm = function( name, content ) {
				var self = this;
				self.name = ko.observable( name );
				self.content = ko.observable( content );
				self.fields = ko.observableArray( [] );
			};
			
			self.articleForm = new self.ArticleForm( "", "" );
			
			self.createArticle = function() {
				var article = { 
					name: self.articleForm.name(), 
					content: self.articleForm.content(), 
					fields: ko.toJS( self.articleForm.fields )
				};
				$.ajax(
					{
						url: "/liber-services/articles", 
						type: "POST", 
						data: JSON.stringify( article ), 
						success: function( article ) {
//							self.articles.push( article );
//							self.goToTagListing();
//							self.successfulCreates.push( article );
						}, 
						contentType: "application/json"
					}
				);
			};
			
			$.getJSON( "/liber-services/fields", 
						function( fields ) { 
							self.articleForm.fields( $.map( fields, 
															function( field ) { 
																return { 
																	id: field.id, 
																	name: field.name, 
																	type: field.type, 
																	options: ko.utils.arrayMap( field.values, 
																		function( fieldValue ) {
																			return fieldValue.value;
																		} ), 
																	paths: ko.utils.arrayMap( field.values, 
																		function( fieldValue ) {
																			return fieldValue.path;
																		} ), 
																	value: ko.observable()
																};
															}
													)
							);
						}
			);
		};
		return new model();
	}
);