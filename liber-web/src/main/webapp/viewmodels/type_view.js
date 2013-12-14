define( ['knockout', 'liber/typeRepository', 'liber/repository', 'toastr', 'plugins/router'], 
	function( ko, typeRepository, repository, toastr, router ) {
		var model = function() {
			var self = this;
			
			self.id = 0;
			self.name = ko.observable();
			self.typeFields = ko.observableArray( [] );
			
			self.allFields = [];
			self.fields = ko.observableArray( [] );
			self.selectedField = ko.observable();
			
			self.deleteType = function() {
				typeRepository.deleteType( self.id, 
					function() {
						toastr.success( 'Successfully deleted ' + self.name() );
						router.navigate( '#types' );
					}
				);
			};
			
			self.addField = function() {
				self.typeFields.push( self.selectedField() );
				typeRepository.updateType( { id: self.id, 
												name: self.name(), 
												fields: ko.toJS( self.typeFields ) }, 
					function( type ) {
						self.fields.removeAll( self.typeFields() );
					} 
				);
			};
			self.removeField = function( field ) {
				self.typeFields.remove( field );
				self.fields.push( field );
			};
			
			self.activate = function( id ) {
				typeRepository.retrieveType( id, 
					function( type ) { 
						self.id = type.id;
						self.name( type.name );
						self.typeFields( type.fields );
						self.adjustFields();
					}
				);
				repository.retrieveFields( 
					function( fields ) { 
						self.allFields = fields;
						self.adjustFields();
					}
				);
			};
			
			self.adjustFields = function() {
				var fieldIds = $.map( self.typeFields(), 
										function( field ) { 
											return field.id;
										} 
				);
				self.fields( self.allFields.slice( 0 ) );
				self.fields.remove( 
					function( field ) { 
						for( var i = 0; i < fieldIds.length; i++ ) {
							if( field.id == fieldIds[i] ) {
								return true;
							}
						}
					}
				);
			}
		};
		return new model();
	}
);