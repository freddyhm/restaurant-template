module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat:{
			css: {
		    	src: ['src/css/base/normalize.css', 'src/css/base/main.css','src/css/base/layout.css', 
		    		  'src/css/nav/*.css', 'src/css/social-list/*.css', 'src/css/header/*.css', 
		    		  'src/css/module/**/*.css', 'src/css/footer/*.css'],
		    	dest: 'dist/css/concat.css'
		  	},
		  	js: {
		    	src: ['src/js/vendor/modernizr-2.8.3.min.js', 'src/js/vendor/jquery-1.11.2.min.js', 
		    		  'src/js/plugins.js', 'src/js/main.js'],
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
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', 'concat');
};