module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		watch: {
		  src : {
		    files: ['src/**/*', 'index.html'],
		    tasks: ['includereplace', 'concat', 'copy'],
		    options: {
		      spawn: false
		    }
		  }
		},
		copy: {
			dist: {
				src: ['js/vendor/**/*.js', 'img/**/*'],
				dest: 'dist',
				expand: true,
				cwd: 'src'
			}
		},
		concat:{
			css: {
		    	src: ['src/css/base/normalize.css', 'src/css/base/main.css','src/css/base/layout.css', 
		    		  'src/css/button/*.css', 'src/css/nav/*.css', 'src/css/social-list/*.css', 'src/css/header/*.css', 
		    		  'src/css/module/**/*.css', 'src/css/footer/*.css'],
		    	dest: 'dist/css/concat.css'
		  	},
		  	js: {
		    	src: ['src/js/plugins.js', 'src/js/main.js'],
		    	dest: 'dist/js/concat.js'
		  	}
		}, 
		includereplace: {
		  files: {
		    src: 'index.html', // Source files
		    dest: 'dist/' // Destination directory
		  }
		}
	});

	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.registerTask('default', ['copy', 'concat', 'includereplace', 'watch']);
};