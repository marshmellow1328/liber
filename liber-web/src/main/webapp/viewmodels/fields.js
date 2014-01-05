define( ['knockout', 'liber/fieldRepository'], 
	function( ko, fieldRepository ) { 
		var model = function FieldViewModel() {
	        var self = this;
	        
	        self.fields = ko.observableArray( [] );
	        
	        self.activate = function() {
	        	fieldRepository.retrieveFields( self.fields );
	        };
		}
		return new model(); 
	} 
);
