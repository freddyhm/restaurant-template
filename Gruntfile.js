module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat:{
			css: {
		    	src: 'src/**/*.css',
		    	dest: 'dist/css/concat.css'
		  	}

		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['concat']);
};