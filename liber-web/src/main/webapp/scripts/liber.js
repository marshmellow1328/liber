infuser.defaults.templateUrl = "templates";

function TagForm( name, parent, path ) {
	var self = this;
	self.name = ko.observable( name );
	self.parent = ko.observable( parent );
	self.path = ko.observable( path );
}

function TagViewModel() {
	var self = this;
	
	self.contentView = "content";
	self.createFieldView = "createField";
	self.view = ko.observable( self.contentView );
	self.isContentView = ko.computed( function() { return self.view() == self.contentView; } );
	self.isCreateFieldView = ko.computed( function() { return self.view() == self.createFieldView; } );
	self.goToCreateFieldView = function() { self.view( self.createFieldView ); };
	self.goToContentView = function() { self.view( self.contentView );	};
	
	self.articleViewModel = new ArticleViewModel( self );
	self.fieldViewModel = new FieldViewModel( self );
	
	self.tagForm = new TagForm( "", null );
	self.tags = ko.observableArray( [] );
	self.successfulTagAlerts = ko.observableArray( [] );
	
	self.chosenTag = ko.observable();
	self.tagHierarchy = ko.observableArray( buildTagHierarchy() );
	
	self.goToTag = function( tag ) {
		if( !self.articleViewModel.isCreateView() || 
				confirm( "Navigating away will lose any work on the current article. " +
						"Do you want to continue?" ) ) {
			var url = "/liber-services/tags/" + tag.id;
			var articlesUrl = "/liber-services/tags/" + tag.id + "/articles";
			$.getJSON( url, 
						function( tag ) { 
							self.tags( tag.childTags );
							self.tagHierarchy( buildTagHierarchy( tag ) );
							self.tagForm.parent( tag.id );
							$.getJSON( articlesUrl, self.articleViewModel.articles );
						} );
			if( tag.id == 1 ) {
				self.articleViewModel.goToHomeArticles();
			}
			else {
				self.articleViewModel.goToTagListing();
			}
		}
	};
	
	self.createTag = function() {
		var tag = { name: self.tagForm.name(), parent: self.tagForm.parent() };
		$.ajax(
			{
				url: "/liber-services/tags", 
				type: "POST", 
				data: tag, 
				success: function( tag ) { 
					self.tags.push( tag );
					self.successfulTagAlerts.push( tag );
				}
			}
		);
	};
	
	self.goToTag( { id: 1 } );
}

$(document).ready(
	function() {
		ko.applyBindings( new TagViewModel() );
	}
);

function buildTagHierarchy( tag ) {
	var hierarchy = [];
	var currentTag = tag;
	while( currentTag != null ) {
		hierarchy.unshift( currentTag );
		currentTag = currentTag.parent;
	}
	return hierarchy;
}

function getLink( object, relationship ) {
	for( var i = 0; i < object.links.length; i++ ) {
		if( object.links[i].relationship == relationship ) {
			return object.links[i].url;
		}
	}
}