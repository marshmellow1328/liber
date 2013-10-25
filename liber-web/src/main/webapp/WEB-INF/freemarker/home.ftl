<#import "/spring.ftl" as spring/>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Liber</title>
	<link href="<@spring.url "/bootstrap/bootstrap.min.css"/>" rel="stylesheet"/>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="<@spring.url "/bootstrap/bootstrap.min.js"/>"></script>
	<!-- tinymce scripts --!>
	<script src="<@spring.url "/tinymce/tinymce.min.js"/>"></script>
	<script src="<@spring.url "/tinymce/jquery.tinymce.min.js"/>"></script>
	<!-- knockout scripts --!>
	<script src="<@spring.url "/scripts/knockout/knockout-2.3.0.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout/knockout_tinymce.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout/ko-bootstrap-typeahead.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout/TrafficCop-0.3.0.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout/infuser-0.2.0.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout/koExternalTemplateEngine-2.0.5.min.js"/>"></script>
	<!-- liber scripts --!>
	<script src="<@spring.url "/scripts/liber.js"/>"></script>
	<script src="<@spring.url "/scripts/ArticleViewModel.js"/>"></script>
	<script src="<@spring.url "/scripts/FieldViewModel.js"/>"></script>
	<script src="<@spring.url "/scripts/TagViewModel.js"/>"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<h1>Liber</h1>
			<div class="row-fluid">
				<p>Liber is an awesome web content management system!</p>
			</div>
		</div>
		<div class="row-fluid">
			<div class="navbar">
				<div class="navbar-inner">
					<ul class="nav">
						<li><a href="<@spring.url "/"/>"><i class="icon-file"></i>Content</a></li>
						<li>
							<a href="#" data-bind="click: goToFieldView">
								<i class="icon-th-list"></i>Fields
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="row-fluid" data-bind="if: isContentView">
				<div class="row-fluid" 
						data-bind="template: { name: 'breadcrumbs', data: tagViewModel }">
				</div>
				<div class="row-fluid">
					<div class="span4" 
							data-bind="template: { name: 'tagsNav', data: tagViewModel }">
					</div>
					<!-- ko with: articleViewModel -->
						<div class="span8" data-bind="visible: isHomeView">
							<p>Navigate to a tag on the left to view the associated articles.</p>
							<p>
								<button class="btn btn-primary" data-bind="click: goToCreateArticle">
									Create Article
								</button>
							</p>
						</div>
						<div class="span8" 
								data-bind="visible: isTagListingView, 
											template: 'tagArticlesListing'"></div>
						<div class="span8" 
							data-bind="visible: isViewArticleView, 
										template: { name: 'viewArticle', data: activeArticle() }">
						</div>
						<div class="span8" data-bind="visible: isCreateView, template: 'createArticle'">
						</div>
					<!-- /ko -->
				</div>
			</div>
			<div class="row-fluid" data-bind="if: isFieldView">
				<!-- ko with: fieldViewModel -->
					<div data-bind="template: { name: 'fieldListing', 
												if: isListingView }"></div>
					<div data-bind="template: { name: 'viewField', 
												data: activeField, 
												if: isViewView }"></div>
					<div data-bind="template: { name: 'createField', 
												if: isCreateView }"></div>
				<!-- /ko -->
			</div>
		</div>
	</div>
</body>
</html>