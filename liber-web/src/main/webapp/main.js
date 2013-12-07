requirejs.config(
	{
		baseUrl: 'lib', 
		paths: {
			'text' : 'require-2.1.9/text',
			'durandal' : 'durandal-2.0.1/js',
			'plugins' : 'durandal-2.0.1/js/plugins',
			toastr : '//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min',
			'transitions' : 'durandal-2.0.1/js/transitions', 
			viewmodels: '../viewmodels', 
			views: '../views'
		}
	} 
);

define( 'jquery', function() { return jQuery; } );
define( 'knockout', ko );

define( [ 'durandal/system', 'durandal/app', 'durandal/viewLocator' ], 
	function( system, app, viewLocator ) {
		system.debug(true);
	
		app.title = 'Liber';
	
		app.configurePlugins(
			{
				router : true,
				dialog : true,
				widget : true
			} 
		);
	
		app.start().then(
			function() {
				viewLocator.useConvention();
				app.setRoot('viewmodels/shell', 'entrance');
			} 
		);
	} 
);