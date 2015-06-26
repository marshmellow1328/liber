module.exports = function( grunt ) {

    grunt.initConfig( {
        jasmine_nodejs: {
            options: {
                specNameSuffix: '.js',
                reporters: {
                    terminal: {
                        color: true,
                        showStack: false
                    }
                }
            },
            all: {
                specs: ['tests/**']
            }
        },
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
            tasks: [ 'dev' ],
            options: {
                spawn: false
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-develop' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-jasmine-nodejs' );

    grunt.registerTask( 'dev', [ 'jasmine_nodejs', 'jshint', 'develop' ] );
    grunt.registerTask( 'dev-watch', [ 'dev', 'watch' ] );
    grunt.registerTask( 'default', [ 'dev-watch' ] );
};
