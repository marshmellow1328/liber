define( [], 
	function() { 
		var model = function FieldViewModel() {
	        var self = this;
	        
	        self.activeField = ko.observable();
	        self.fields = ko.observableArray( [] );
	        self.form = new FieldForm( "", "text" );

	        self.createView = "create";
	        self.listingView = "listing";
	        self.viewView = "view";
	        self.view = ko.observable( self.listingView );
	        self.isCreateView = ko.computed( 
                function() {
                    return self.view() == self.createView;
                }
	        );
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
	        self.goToCreateView = function() {
                self.view( self.createView );
	        };
	        self.goToListingView = function() {
                self.view( self.listingView );
	        };
	        
	        self.createField = function() {
                $.ajax(
                    {
                        url: "/liber-services/fields", 
                        type: "POST", 
                        data: JSON.stringify( ko.toJS( self.form ) ), 
                        success: function( field ) {
                            alert( "success!" );
//	                        self.successfulCreates.push( article );
                            self.fields.push( field );
                        }, 
                        contentType: "application/json"
                    }
                );
	        };
	        
	        $.getJSON( "/liber-services/fields", function( fields ) { self.fields( fields ); } );
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
		return new model(); 
	} 
);
