function ArticleViewModel( masterViewModel ) {
	var self = this;
	self.masterViewModel = masterViewModel;
	
	self.articles = ko.observableArray( [] );
	self.articleForm = new ArticleForm( "", "", [] );
	self.tagPaths = [];
	self.fields = ko.observableArray( [] );
	
	self.successfulCreates = ko.observableArray( [] );
	self.successfulDeletes = ko.observableArray( [] );
	
	self.homeView = "home";
	self.tagListingView = "tagListing";
	self.viewArticleView = "view";
	self.createView = "create";
	self.activeArticle = ko.observable( { name: "", content: "", fields: [] } );
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
			tags: $.map( self.articleForm.tags(), function( tag ) { return tag.path; } ),
			fields: ko.toJS( self.articleForm.fields )
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
	
	$.getJSON( "/liber-services/fields", 
				function( fields ) { 
					self.fields( fields );
					self.articleForm.fields( $.map( fields, 
													function( field ) { 
														return { 
																	id: field.id, 
																	name: field.name, 
																	type: field.type, 
																	options: ko.utils.arrayMap( field.values, 
																		function( fieldValue ) {
																			return fieldValue.value;
																		} ), 
																	paths: ko.utils.arrayMap( field.values, 
																		function( fieldValue ) {
																			return fieldValue.path;
																		} ), 
																	value: ko.observable()
																};
													}
											)
					);
				}
	);
}

function ArticleForm( name, content, tags ) {
	var self = this;
	self.name = ko.observable( name );
	self.content = ko.observable( content );
	self.tags = ko.observableArray( tags );
	self.fields = ko.observableArray( [] );
}