function FieldViewModel( masterViewModel ) {
	var self = this;
	self.masterViewModel = masterViewModel;
	self.hierarchicalValueViewModel = new HierarchicalValueViewModel( this );
	
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
	self.goToViewView = function( field ) {
		self.activeField( field );
		if( field.type == 'hierarchical' ) {
			field.values.sort( function( left, right ) { return left.id - right.id; } );
			self.hierarchicalValueViewModel.goToValue( 
					new HierarchicalFieldValue( field.values[0] ) );
		}
		self.view( self.viewView );
	};
	
	self.createField = function() {
		$.ajax(
			{
				url: "/liber-services/fields", 
				type: "POST", 
				data: JSON.stringify( ko.toJS( self.form ) ), 
				success: function( field ) {
					alert( "success!" );
//					self.successfulCreates.push( article );
					self.fields.push( field );
				}, 
				contentType: "application/json"
			}
		);
	};
	
	self.deleteField = function( field ) {
		$.ajax(
			{
				url: "/liber-services/fields/" + field.id, 
				type: "DELETE", 
				success: function() {
					self.goToListingView();
					self.fields.remove( 
							function( item ) { return item.id == self.activeField().id; } );
					self.successfulDeletes.push( self.activeField() );
					self.activeField( { name: "", content: "" } );
				}
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

function HierarchicalValueViewModel( fieldViewModel ) {
	var self = this;
	self.fieldViewModel = fieldViewModel;
	
	self.activeValue = ko.observable( {} );
	self.newValueText = ko.observable();

	self.createHierarchicalValue = function() {
		var test = { value: self.newValueText(), parentId: self.activeValue().id };
		$.ajax(
			{
				url: "/liber-services/fields/" + fieldViewModel.activeField().id + "/values", 
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
	
	self.goToValue = function( value ) {
		$.getJSON(
			"/liber-services/fields/" + fieldViewModel.activeField().id + "/values/" + value.id, 
			function( value ) {
				self.activeValue( new HierarchicalFieldValue( value ) );
			}
		);
	};
}

function HierarchicalFieldValue( value ) {
	var self = this;
	
	self.id = value.id;
	self.value = ko.observable( value.value );
	self.parent = ko.observable( ( value.parent != null ) ? 
									new HierarchicalFieldValue( value.parent ) : 
									null );
	self.children = ko.observableArray( value.children );
	self.valueHierarchy = ko.observableArray( buildValueHierarchy( this ) );
}

function buildValueHierarchy( value ) {
	var hierarchy = [];
	var currentValue = value;
	while( currentValue != null ) {
		hierarchy.unshift( currentValue );
		currentValue = currentValue.parent();
	}
	return hierarchy;
}