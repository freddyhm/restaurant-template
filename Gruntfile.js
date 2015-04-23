module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		copy: {
			dist: {
				src: ['**'],
				dest: 'dist/js/vendor',
				expand: true,
				cwd: 'src/js/vendor/'
			}
		},
		concat:{
			css: {
		    	src: ['src/css/base/normalize.css', 'src/css/base/main.css','src/css/base/layout.css', 
		    		  'src/css/nav/*.css', 'src/css/social-list/*.css', 'src/css/header/*.css', 
		    		  'src/css/module/**/*.css', 'src/css/footer/*.css'],
		    	dest: 'dist/css/concat.css'
		  	},
		  	js: {
		    	src: ['src/js/plugins.js', 'src/js/main.js'],
		    	dest: 'dist/js/concat.js'
		  	}
		}, 
		includes: {
		  files: {
		    src: ['index.html'], // Source files
		    dest: 'dist', // Destination directory
		    flatten: true,
		    cwd: '.'
		  }
		}
	});

	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', 'copy', 'concat');
};