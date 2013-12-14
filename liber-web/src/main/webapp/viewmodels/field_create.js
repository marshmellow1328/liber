define( ['knockout'], function( ko ) {
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
			alert( self.name() );
		};
		
	};
	return new model();
})