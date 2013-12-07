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
                	route: 'createContent', 
                	moduleId: 'viewmodels/content_create', 
                	nav: false, 
                }, 
                {
            		route: 'fields', 
            		title: 'Fields', 
            		icon: 'icon-th-list', 
            		moduleId: 'viewmodels/fields', 
            		nav: true 
                },
                {
                	route: 'fields/:id',
                	moduleId: 'viewmodels/field_view',
                	nav: false,
                }
            ]).buildNavigationModel();
 
            return router.activate();
        }
    };
});