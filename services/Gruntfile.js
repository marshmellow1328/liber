module.exports = function( grunt ) {

	grunt.initConfig(
		{
			develop: {
				server: {
					file: 'app.js'
				}
			},
			jshint: {
				all: ['*.js'],
				options: {
					smarttabs: true
				}
			},
			watch: {
				js: {
					files: ['app.js', 'ContentService.js'],
					tasks: ['start'],
					options: { nospawn: true }
				}
			}
		}
	);
	
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-develop' );
	
	grunt.registerTask( 'start', ['jshint', 'develop'] );
	grunt.registerTask( 'start-watch', ['start', 'watch'] );
	grunt.registerTask( 'default', ['start-watch'] );

};
