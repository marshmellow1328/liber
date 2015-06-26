module.exports = function( grunt ) {

    grunt.initConfig( {
        jshint: {
            files: [ 'app/**/*.js', '!app/lib/**' ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
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
                dest: 'dist/styles',
                ext: '.css'
            }
        },
        clean: {
            tmp: [ '.tmp/*' ],
            dist: [ 'dist/*' ]
        },
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: [ '**/*.html', '**/*.js', 'fonts/*', 'lib/ng-ckeditor/ng-ckeditor.js' ],
                dest: 'dist/'
            }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components'
            },
            scripts: {
                options: {
                    destPrefix: 'dist/lib'
                },
                files: {
                    'jquery.min.js': 'jquery/jquery.min.js',
                    'angular.min.js': 'angular/angular.min.js',
                    'angular-resource.min.js': 'angular-resource/angular-resource.min.js',
                    'angular-ui-router.min.js': 'angular-ui-router/release/angular-ui-router.min.js',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js',
                    'toastr.min.js': 'toastr/toastr.min.js',
                    'toastr.min.css': 'toastr/toastr.min.css'
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-develop' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-bowercopy' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-karma' );

    grunt.registerTask( 'dist', [ 'clean:dist', 'copy', 'less', 'bowercopy', 'clean:tmp' ] );
    grunt.registerTask( 'dev', [ 'jshint', 'dist', 'develop' ] );'less',
    grunt.registerTask( 'dev-watch', [ 'dev', 'watch' ] );
    grunt.registerTask( 'test', [ 'karma' ] );
    grunt.registerTask( 'default', [ 'dev-watch' ] );
};
