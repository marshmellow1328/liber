<#import "/spring.ftl" as spring/>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Liber - Home</title>
	<link href="<@spring.url "/bootstrap/bootstrap.min.css"/>" rel="stylesheet"/>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
	<script src="<@spring.url "/bootstrap/bootstrap.min.js"/>"></script>
	<script src="<@spring.url "/tinymce/tinymce.min.js"/>"></script>
	<script src="<@spring.url "/tinymce/jquery.tinymce.min.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout-2.3.0.js"/>"></script>
	<script src="<@spring.url "/scripts/knockout_tinymce.js"/>"></script>
	<script src="<@spring.url "/scripts/ko-bootstrap-typeahead.js"/>"></script>
	<script src="<@spring.url "/scripts/TrafficCop-0.3.0.js"/>"></script>
	<script src="<@spring.url "/scripts/infuser-0.2.0.js"/>"></script>
	<script src="<@spring.url "/scripts/koExternalTemplateEngine-2.0.5.min.js"/>"></script>
	<script src="<@spring.url "/scripts/liber.js"/>"></script>
	<script src="<@spring.url "/scripts/articles.js"/>"></script>
	<script src="<@spring.url "/scripts/field.js"/>"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<h1>Home</h1>
		</div>
		<div class="row-fluid">
			<div class="navbar">
				<div class="navbar-inner">
					<ul class="nav">
						<li><a href="<@spring.url "/"/>"><i class="icon-home"></i>Home</a></li>
						<li>
							<a href="<@spring.url "/createArticle"/>">
								<i class="icon-file"></i>Create Article
							</a>
						</li>
						<li>
							<a href="#" data-bind="click: goToCreateFieldView">
								<i class="icon-th-list"></i>Create Field
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="row-fluid">
			<div class="row-fluid">
				<p>Liber is an awesome web content management system!</p>
			</div>
			<div class="row-fluid" data-bind="if: isContentView">
				<div class="row-fluid" data-bind="template: 'breadcrumbs'"></div>
				<div class="row-fluid">
					<div class="span4" data-bind="template: 'tagsNav'"></div>
					<!-- ko with: articleViewModel -->
						<div class="span8" data-bind="visible: isHomeView">
							<p>Navigate to a tag on the left to view the associated articles.</p>
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
			<div class="row-fluid" 
					data-bind="visible: isCreateFieldView, 
								template: { name: 'createField', data: fieldViewModel }">
			</div>
		</div>
	</div>
</body>
</html>