infuser.defaults.templateUrl = "templates";

function MasterViewModel() {
	var self = this;
	
	self.contentView = "content";
	self.fieldView = "field";
	self.view = ko.observable( self.contentView );
	self.isContentView = ko.computed( function() { return self.view() == self.contentView; } );
	self.isFieldView = ko.computed( function() { return self.view() == self.fieldView; } );
	self.goToFieldView = function() { self.view( self.fieldView ); };
	self.goToContentView = function() { self.view( self.contentView );	};
	
	self.articleViewModel = new ArticleViewModel( self );
	self.fieldViewModel = new FieldViewModel( self );
	self.tagViewModel = new TagViewModel( self, self.articleViewModel );
	self.tagViewModel.goToTag( { id: 1 } );
}

$(document).ready(
	function() {
		ko.applyBindings( new MasterViewModel() );
	}
);