define( [], function() {
	var model = function() {
		var self = this;
		
		self.name = ko.observable();
		self.type = ko.observable();
		
		self.createField = function() {
			alert( self.name() );
		}
	};
	return new model();
})