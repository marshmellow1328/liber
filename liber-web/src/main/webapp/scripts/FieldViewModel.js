function FieldViewModel( masterViewModel ) {
	var self = this;
	self.masterViewModel = masterViewModel;
	
	self.form = new FieldForm( "", "text" );
	
	self.createField = function() {
//		var field = { name: self.form.name(), type: self.form.type() };
		
		$.ajax(
			{
				url: "/liber-services/fields", 
				type: "POST", 
				data: JSON.stringify( ko.toJS( self.form ) ), 
				success: function( field ) {
					alert( "success!" );
//						self.successfulCreates.push( article );
				}, 
				contentType: "application/json"
			}
		);
	};
}

function FieldForm( name, type ) {
	var self = this;
	
	self.name = ko.observable( name );
	self.type = ko.observable( type );
	self.values = ko.observableArray( [] );
	
	self.addValue = function() {
		self.values.push( { value: "" } );
	};
	self.removeValue = function( value ) {
		self.values.remove( value );
	};
}