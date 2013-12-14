define( ['knockout', 'liber/typeRepository', 'liber/repository', 'toastr', 'plugins/router'], 
	function( ko, typeRepository, repository, toastr, router ) {
		var model = function() {
			var self = this;
			
			self.id = 0;
			self.name = ko.observable();
			self.typeFields = ko.observableArray( [] );
			
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
				self.fields.removeAll( self.typeFields() );
			}
			
			self.activate = function( id ) {
				typeRepository.retrieveType( id, 
					function( type ) { 
						self.id = type.id;
						self.name( type.name );
					}
				);
				repository.retrieveFields( self.fields );
			}
		};
		return new model();
	}
);