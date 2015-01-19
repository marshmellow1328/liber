module.exports = function( grunt ) {

    grunt.initConfig( {
        jshint: {
            files: [ 'web/app/**/*.js','services/**/*.js', '!web/app/lib/**' ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        develop: {
            server: {
                file: 'services/app.js'
            }
        },
        watch: {
            files: [ 'services/**', 'web/app/**' ],
            tasks: [ 'dev' ]
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-develop' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.registerTask( 'dev', [ 'jshint', 'develop' ] );
    grunt.registerTask( 'dev-watch', [ 'dev', 'watch' ] );
    grunt.registerTask( 'default', [ 'dev-watch' ] );
};
