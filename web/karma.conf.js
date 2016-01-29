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
                'test/content/create-content-controller.spec.js'
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
