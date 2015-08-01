module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		tinypng: {
		    options: {
		        apiKey: "--",
		        summarize: true,
		        showProgress: true,
		        stopOnImageError: true
		    },
		    compress: {
		        expand: true, 
		        src: ['face-justin.jpg'], 
		        cwd: 'src/img/testimonial/',
		        dest: 'src/img/testimonial/'
		    }
    	},
		responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          aspectRatio: false,
	          sizes: [{
	            width: 100,
	            suffix: '-sm'
	          }
	          ]
	        },
	        files: [{
	          expand: true,
	          src: ['face-justin.jpg'],
	          cwd: 'src/img/testimonial/',
	          dest: 'src/img/testimonial/'
	        }]
	      }
	    },
		watch: {
			sass: {
				files: ['src/sass/**/*.scss'],
				tasks: ['sass']
			},
			livereload: {
				options: {
					livereload: true,
					spawn: false
				},
				files: ['dist/**/*']
			},
			html: {
		    	files: ['src/includes/**/*.html', 'index.html'],
		    	tasks: ['includereplace']
			},
			vendorjs: {
				files: ['src/js/vendor/**/*.js'],
				tasks: ['copy:js']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['process-js']
			},
			img: {
				files: ['src/img/**/*'],
				tasks: ['copy:img']
			}
		},
		postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
               	src: 'dist/css/styles.min.css'	
            } 
        },
		sass: {
	/*		options: {
		         sourceMap: true,
		         outputStyle: 'compressed'
		    },*/
			dist: {
				files: {
					'dist/css/styles.min.css': 'src/sass/all.scss'
				}
			}
		},
		copy: {
			js:{
				src: ['js/*.js', 'js/vendor/*.js'],
				dest: 'dist',
				expand: true,
				cwd: 'src'
			},
			img:{
				src: 'img/**/*',
				dest: 'dist',
				expand: true,
				cwd: 'src'
			}
		},
		concat: {
		  	js: {
		    	src: ['src/js/main.js'],
		    	dest: 'src/js/custom.min.js'
		  	}
		},
		uglify: {
		   dist: {
		      options: {
		         sourceMap: true
		      },
		      files: {
		         'dist/js/custom.min.js': 'src/js/custom.min.js',
		      }
		   }
		},
		includereplace: {
			index: {
				src: ['index.html'],
		    	dest: 'dist/'
		  	},
		  	projects: {
		  		cwd: 'src/includes/projects/',
		  		expand: true,
		    	src: ['*.html'],
		    	dest: 'dist/'
		  	}
		},
		  environments: {
		      production: {
		          options: {
	          		local_path: 'dist',
	        		current_symlink: 'current',
	        		deploy_path: '/home/fhm/public_html',
		        	releases_to_keep: 1,
		            host: 'freddyhm.com',
		            username: '-',
		            password: '-',
		            port: 2222
		          }
		      }
		  }
	});

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-image');
	grunt.loadNpmTasks('grunt-tinypng');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ssh-deploy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('setup', ['sass', 'concat', 'includereplace', 'copy']);
	grunt.registerTask('process-js', ['concat', 'copy:js']);
	grunt.registerTask('prod-setup', ['sass', 'postcss', 'concat', 'uglify', 'includereplace', 'copy', '']);
	grunt.registerTask('deploy', ['sass', 'postcss', 'concat', 'uglify', 'includereplace', 'copy', 'ssh_deploy:production']);

	grunt.registerTask('default', ['watch']);
};
