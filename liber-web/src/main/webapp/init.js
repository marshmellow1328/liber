define( [
	         "jquery", 
	         "ko", 
	         "infuser", 
	         "koExternalTemplateEngine", 
	         "viewmodel/MasterViewModel"
         ], 
	function( jQuery, ko, infuser, a, masterViewModel ) {
		window.ko = ko;
		infuser.defaults.templateUrl = "templates";
	
		jQuery(document).ready(
			function() {
				ko.applyBindings( masterViewModel );
			}
		);
	}
);