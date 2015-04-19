module.exports = function(config) {
    config.set(
        {
            basePath: '',
            frameworks: [ 'jasmine' ],
            files: [
                'bower_components/angular/angular.min.js',
                'app/content/content-controller.js',
                'test/content/content-controller_test.js'
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
