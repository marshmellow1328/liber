define( ['knockout', 'liber/typeRepository', 'toastr', 'plugins/router'], 
	function( ko, typeRepository, toastr, router ) {
		var model = function() {
			var self = this;
			
			self.name = ko.observable();
			
			self.createType = function() {
				typeRepository.createType( { name: self.name() }, 
					function( type ) {
						toastr.success( 'Successfully created ' + type.name );
						router.navigate( '#types' );
					}
				);
			}
		};
		return new model();
	}
);
