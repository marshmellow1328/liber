define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                {
                	route: '', 
                	title: 'Content', 
                	icon: 'icon-file', 
                	moduleId: 'viewmodels/content', 
                	nav: true 
                },
                {
                	route: 'content/:id', 
                	moduleId: 'viewmodels/content_view', 
                	nav: false, 
                }, 
                {
            		route: 'fields', 
            		title: 'Fields', 
            		icon: 'icon-th-list', 
            		moduleId: 'viewmodels/fields', 
            		nav: true 
                }
            ]).buildNavigationModel();
 
            return router.activate();
        }
    };
});