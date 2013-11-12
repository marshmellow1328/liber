requirejs.config( 
	{
		baseUrl: "lib",
		paths: {
			infuser: "knockout/infuser-0.2.0", 
			init: "../init",
			jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min",
			ko: "knockout/knockout-2.3.0", 
			koExternalTemplateEngine: "knockout/koExternalTemplateEngine-2.0.5.min", 
			trafficCop: "knockout/TrafficCop-0.3.0", 
			viewmodel: "../viewmodels"
		}, 
		shim: {
			infuser: {
				deps: ["trafficCop"], 
				exports: "infuser"
			}, 
			koExternalTemplateEngine: {
				deps: ["ko", "infuser"]
			}, 
			test: {
				deps: ["ko", "jquery", "infuser"]
			}, 
			trafficCop: {
				deps: ["jquery"]
			}
		}
	}
);

require( ["test2"] );
require( ["init"] );