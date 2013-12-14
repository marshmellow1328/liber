define( ['knockout', 'liber/typeRepository', 'toastr', 'plugins/router'], 
	function( ko, typeRepository, toastr, router ) {
		var model = function() {
			var self = this;
			
			self.id = 0;
			self.name = ko.observable();
			
			self.deleteType = function() {
				typeRepository.deleteType( self.id, 
					function() {
						toastr.success( 'Successfully deleted ' + self.name() );
						router.navigate( '#types' );
					}
				);
			}
			
			self.activate = function( id ) {
				typeRepository.retrieveType( id, 
					function( type ) { 
						self.id = type.id;
						self.name( type.name );
					}
				);
			}
		};
		return new model();
	}
);