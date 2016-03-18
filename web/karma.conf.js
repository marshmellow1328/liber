module.exports = function(config) {
    config.set(
        {
            basePath: '',
            frameworks: [ 'jasmine' ],
            files: [
                'bower_components/angular/angular.min.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'app/content/content-controller.js',
                'test/content/content-controller.spec.js',
                'app/content/content-listing-controller.js',
                'test/content/content-listing-controller.spec.js',
                'app/content/create-content-controller.js',
                'test/content/create-content-controller.spec.js',
                'app/content-types/content-type-controller.js',
                'test/content-types/content-type-controller.spec.js',
                'app/content-types/content-type-listing-controller.js',
                'test/content-types/content-type-listing-controller.spec.js',
                'app/content-types/create-content-type-controller.js',
                'test/content-types/create-content-type-controller.spec.js',
                'app/fields/create-field-controller.js',
                'test/fields/create-field-controller.spec.js',
                'app/fields/field-controller.js',
                'test/fields/field-controller.spec.js',
                'app/fields/field-listing-controller.js',
                'test/fields/field-listing-controller.spec.js',
                'app/content-types/duplicate-filter.js',
                'test/content-types/duplicate-filter.spec.js'
            ],
            plugins: [
                'karma-jasmine',
                'karma-phantomjs-launcher'
            ],
            browsers: [ 'PhantomJS' ],
            autoWatch: true
        }
    );
};
