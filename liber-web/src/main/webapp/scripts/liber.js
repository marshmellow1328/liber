(function($) {
	var init_queue = $.Deferred(); // jQuery deferred object used for creating TinyMCE instances synchronously
	init_queue.resolve();
	ko.bindingHandlers.tinymce = {
	    init: function (element, valueAccessor, allBindingsAccessor, context) {
	        var options    = allBindingsAccessor().tinymceOptions || {
						menubar : false,
						statusbar : false,
						paste_as_text: true,
						toolbar: "bold italic hr | link unlink | bullist numlist | fullscreen",
						plugins: "link,paste,fullscreen"
					};
	        var modelValue = valueAccessor();
	        var value      = ko.utils.unwrapObservable(valueAccessor());
	        var el         = $(element);
	
	        //handle edits made in the editor. Updates after an undo point is reached.
	        options.setup = function (ed) {
						ed.on('change', function(e) {
							if (ko.isWriteableObservable(modelValue)) {
	              modelValue(ed.getContent());
	          	}
						});
						ed.on('keyup', function(e) {
							if (ko.isWriteableObservable(modelValue)) {
	              modelValue(ed.getContent({format: 'raw'}));
	          	}
				    });
	        };
	
	        //handle destroying an editor 
	        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
	            setTimeout(function(){$(element).tinymce().remove();}, 0);
	        });
	
	        setTimeout(function() { $(element).tinymce(options); }, 0);
	        el.html(value);
	    },
	    update: function (element, valueAccessor, allBindingsAccessor, context) {
	        var el = $(element);
	        var value = ko.utils.unwrapObservable(valueAccessor());
	        var id = el.attr('id');
	        
	        //handle programmatic updates to the observable
	        // also makes sure it doesn't update it if it's the same. 
	        // otherwise, it will reload the instance, causing the cursor to jump.
	        if (id !== undefined ){
	            var content = tinyMCE.get(id).getContent({format: 'raw'});
	            if (content !== value) {
	                el.html(value);
	            }
	        }
	    }
	};
}(jQuery));

function TagForm( name, parent, path ) {
	var self = this;
	self.name = ko.observable( name );
	self.parent = ko.observable( parent );
	self.path = ko.observable( path );
}

function ArticleForm( name, content, tags ) {
	var self = this;
	self.name = ko.observable( name );
	self.content = ko.observable( content );
	self.tags = ko.observableArray( tags );
}

function ArticleViewModel( masterViewModel ) {
	var self = this;
	self.masterViewModel = masterViewModel;
	
	self.articles = ko.observableArray( [] );
	self.articleForm = new ArticleForm( "", "", [] );
	self.tagPaths = [];
	
	self.successfulCreates = ko.observableArray( [] );
	self.successfulDeletes = ko.observableArray( [] );
	
	self.homeView = "home";
	self.tagListingView = "tagListing";
	self.viewArticleView = "view";
	self.createView = "create";
	self.activeArticle = ko.observable( { name: "", content: "" } );
	self.articleView = ko.observable( self.homeView );
	self.isHomeView = ko.computed( function() {
			return self.articleView() == self.homeView;
		}
	);
	self.isTagListingView = ko.computed( function() {
			return self.articleView() == self.tagListingView;
		}
	);
	self.isViewArticleView = ko.computed( function() {
			return self.articleView() == self.viewArticleView;
		}
	);
	self.isCreateView = ko.computed( function() {
			return self.articleView() == self.createView;
		}
	);
	self.goToHomeArticles = function() {
		self.articleView( self.homeView );
	};
	self.goToTagListing = function () {
		self.successfulCreates.removeAll();
		self.successfulDeletes.removeAll();
		self.articleView( self.tagListingView );
		self.articleForm.name( "" );
		self.articleForm.content( "" );
		self.articleForm.tags( [] );
	};
	self.goToViewArticle = function( article ) {
		$.getJSON( "/liber-services/articles/" + article.id, 
					function( article ) {
						self.activeArticle( article );
					} );
		self.articleView( self.viewArticleView );
	};
	self.goToCreateArticle = function() {
		$.getJSON( "/liber-services/tags", 
					function( tags ) { 
						self.tagPaths = $.map( tags, 
												function( tag ) { return tag.path; } ); 
					} );
		self.articleView( self.createView );
	};
	
	self.createArticle = function() {
		var article = { 
			name: self.articleForm.name(), 
			content: self.articleForm.content(), 
			tags: $.map( self.articleForm.tags(), function( tag ) { return tag.path; } )
		};
		$.ajax(
			{
				url: "/liber-services/articles", 
				type: "POST", 
				data: JSON.stringify( article ), 
				success: function( article ) {
					self.articles.push( article );
					self.goToTagListing();
					self.successfulCreates.push( article );
				}, 
				contentType: "application/json"
			}
		);
	};
	
	self.deleteArticle = function( article ) {
		$.ajax(
			{
				url: "/liber-services/articles/" + article.id, 
				type: "DELETE", 
				success: function() {
					self.goToTagListing();
					self.articles.remove( 
							function( item ) { return item.id == self.activeArticle().id; } );
					self.successfulDeletes.push( self.activeArticle() );
					self.activeArticle( { name: "", content: "" } );
				}
			}
		);
	};
	
	self.addTag = function() {
		self.articleForm.tags.push( { path: "" } );
	};
}

function TagViewModel() {
	var self = this;
	
	self.articleViewModel = new ArticleViewModel( self );
	
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