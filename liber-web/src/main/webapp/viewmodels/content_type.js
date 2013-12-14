define( ['knockout', 'liber/typeRepository'], function( ko, typeRepository ) {
	var model = function() {
		var self = this;
		
		self.types = ko.observableArray( [] );
		
		self.activate = function() {
			typeRepository.retrieveTypes( self.types );
		}
	}
	return new model();
})