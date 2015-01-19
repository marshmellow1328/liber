module.exports = function( grunt ) {

    grunt.initConfig( {
        jshint: {
            files: [ '**/*.js', '!node_modules/**' ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        develop: {
            server: {
                file: 'app.js'
            }
        },
        watch: {
            files: [ '**/*.js', '!node_modules/**/*' ],
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
