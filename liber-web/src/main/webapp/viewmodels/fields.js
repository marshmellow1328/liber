define( ['knockout', 'liber/fieldRepository'], 
	function( ko, fieldRepository ) { 
		var model = function FieldViewModel() {
	        var self = this;
	        
	        self.activeField = ko.observable();
	        self.fields = ko.observableArray( [] );

	        self.listingView = "listing";
	        self.viewView = "view";
	        self.view = ko.observable( self.listingView );
	        self.isListingView = ko.computed(
                function() {
                    return self.view() == self.listingView;
                }
	        );
	        self.isViewView = ko.computed(
                function() {
                	return self.view() == self.viewView;
                }
	        );
	        self.goToListingView = function() {
                self.view( self.listingView );
	        };
	        
	        self.activate = function() {
	        	fieldRepository.retrieveFields( self.fields );
	        };
		}
		return new model(); 
	} 
);
