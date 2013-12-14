define( ['liber/typeRepository', 'plugins/router', 'toastr'], 
	function( typeRepository, router, toastr ) {
		var model = function() {
			var self = this;
			
			self.allFields = [];
			self.types = ko.observableArray( [] );
			self.selectedType = ko.observable( { id: 0 } );
			
			self.selectType = function( type ) {
				self.selectedType( type );
				typeRepository.retrieveType( type.id, 
					function( type ) {
						self.selectedType( type );
						self.adjustFields();
					}
				);
			};
			
			self.adjustFields = function() {
				self.articleForm.fields( 
					$.map( self.selectedType().fields, 
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
			};
			
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
							toastr.success( 'Successfully created ' + self.articleForm.name() );
							router.navigate( '' );
						}, 
						contentType: "application/json"
					}
				);
			};
			
			self.activate = function() {
				typeRepository.retrieveTypes( 
					function( types ) {
						self.types( types );
						self.selectType( types[0] );
					}
				);
			};
		};
		return new model();
	}
);