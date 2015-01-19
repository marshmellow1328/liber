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
        },
        less: {
            options: {
                paths: [ 'web/app/styles' ]
            },
            files: {
                expand: true,
                cwd: 'web/app/styles',
                src: [ 'liber.less' ],
                dest: 'web/app/styles',
                ext: '.css'
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-develop' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );

    grunt.registerTask( 'dev', [ 'jshint', 'less', 'develop' ] );
    grunt.registerTask( 'dev-watch', [ 'dev', 'watch' ] );
    grunt.registerTask( 'default', [ 'dev-watch' ] );
};
