define( [], function() {
	var buildValueHierarchy = function( value ) {
        var hierarchy = [];
        var currentValue = value;
        while( currentValue != null ) {
            hierarchy.unshift( currentValue );
            currentValue = currentValue.parent();
        }
        return hierarchy;
	};
	
	var HierarchicalFieldValue = function( value ) {
        var self = this;
        
        self.id = value.id;
        self.value = ko.observable( value.value );
        self.parent = ko.observable( ( value.parent != null ) ? 
                                        new HierarchicalFieldValue( value.parent ) : 
                                        null );
        self.children = ko.observableArray( value.children );
        self.valueHierarchy = ko.observableArray( buildValueHierarchy( this ) );
	};
	
	var model = function() {
		var self = this;
		self.baseUrl = "/liber-services/fields/";
		
		self.id = ko.observable();
		self.name = ko.observable();
		self.type = ko.observable();
		self.activeValue = ko.observable( new HierarchicalFieldValue( { id: 0 } ) );
        self.newValueText = ko.observable();
		
        self.goToValue = function( value ) {
            $.getJSON( self.baseUrl + self.id() + "/values/" + value.id, 
	                    function( value ) {
	                    	self.activeValue( new HierarchicalFieldValue( value ) );
	                    }
            );
        };
        
        self.deleteField = function( field ) {
            $.ajax(
                {
                    url: self.baseUrl + self.id(), 
                    type: "DELETE", 
                    success: function() {
                    	alert('deleted successfully');
//                        self.goToListingView();
//                        self.fields.remove( 
//                        	function( item ) { return item.id == self.activeField().id; } );
//                        self.successfulDeletes.push( self.activeField() );
//                        self.activeField( { name: "", content: "" } );
                    }
                }
            );
        };

        self.createHierarchicalValue = function() {
            var test = { value: self.newValueText(), parentId: self.activeValue().id };
            $.ajax(
                {
                    url: "/liber-services/fields/" + self.id() + "/values", 
                    type: "POST", 
                    data: JSON.stringify( test ), 
                    success: function( value ) {
                        var newValue = new HierarchicalFieldValue( value );
                        var activeValue = self.activeValue();
                        activeValue.children.push( newValue );
                        self.newValueText( "" );
                        alert( "success!" );
                        //self.successfulCreates.push( article );
                    }, 
                    contentType: "application/json"
                }
            );
        };
        self.deleteHierarchicalValue = function( value ) {
            $.ajax(
                {
                    url: "/liber-services/fields/" + self.id() + "/values/" + value.id, 
                    type: "DELETE", 
                    success: function() {
                        self.activeValue().children.remove( 
                        	function( item ) { return item.id == value.id; } );
                    }
                }
            );
        };
		
		self.activate = function( id ) {
			$.getJSON( self.baseUrl + id, 
				function( field ) { 
					self.id( id );
					self.name( field.name );
					self.type( field.type );
                    field.values.sort( function( left, right ) { return left.id - right.id; } );
                    if( field.values.length > 0 ) {
                        self.goToValue( new HierarchicalFieldValue( field.values[0] ) );
                    }
				}
			);
		};
	};
	return new model();
} );