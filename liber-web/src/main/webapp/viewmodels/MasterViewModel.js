define( ["ko", "viewmodel/ArticleViewModel", "viewmodel/FieldViewModel", "viewmodel/TagViewModel"], 
	function MasterViewModel( ko, articleViewModel, fieldViewModel, tagViewModel ) {
		return new function() {
			var self = this;
			
			self.contentView = "content";
			self.fieldView = "field";
			self.view = ko.observable( self.contentView );
			self.isContentView = ko.computed( function() { return self.view() == self.contentView; } );
			self.isFieldView = ko.computed( function() { return self.view() == self.fieldView; } );
			self.goToFieldView = function() { self.view( self.fieldView ); };
			self.goToContentView = function() { self.view( self.contentView );	};
			
			self.articleViewModel = articleViewModel;
			self.fieldViewModel = new FieldViewModel( self );
			self.tagViewModel = tagViewModel;
			self.tagViewModel.goToTag( { id: 1 } );
		};
	}
);