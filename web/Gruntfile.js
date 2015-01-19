module.exports = function( grunt ) {

    grunt.initConfig( {
        jshint: {
            files: [ 'app/**/*.js', '!app/lib/**' ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        develop: {
            server: {
                file: 'server.js'
            }
        },
        watch: {
            files: [ 'app/**/**', '!app/lib/**', '!app/styles/bootstrap/**', '!app/fonts/**', '!app/styles/liber.css' ],
            tasks: [ 'dev' ],
            options: {
                spawn: false
            }
        },
        less: {
            options: {
                paths: [ 'app/styles' ]
            },
            files: {
                expand: true,
                cwd: 'app/styles',
                src: [ 'liber.less' ],
                dest: 'app/styles',
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
