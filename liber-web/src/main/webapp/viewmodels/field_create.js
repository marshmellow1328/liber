define( ['knockout', 'liber/fieldRepository', 'toastr', 'plugins/router'], 
	function( ko, fieldRepository, toastr, router ) {
		var model = function() {
			var self = this;
			
			self.name = ko.observable();
			self.type = ko.observable();
			self.values = ko.observableArray( [] );
			
			self.addValue = function() {
				self.values.push( { value: '' } );
			};
			self.removeValue = function( value ) {
				self.values.remove( value );
			};
			
			self.createField = function() {
//				alert( self.name() );
				fieldRepository.createField( { name: self.name(), 
												type: self.type(), 
												values: ko.toJS( self.values ) }, 
					function( field ) {
						toastr.success( 'Successfully created ' + field.name );
						router.navigate( '#fields' );
					}
				);
			};
			
		};
		return new model();
	}
);