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
		        src: 'arc__pattern.jpg', 
		        cwd: 'src/img/',
		        dest: 'src/img/'
		    }
    	},
		responsive_images: {
	      dev: {
	        options: {
	          engine: 'im',
	          aspectRatio: false,
	          sizes: [{
	            width: 221,
	            suffix: '-sm'
	          }, {
	            width: 421,
	            suffix: '-med'
	          }
	          ]
	        },
	        files: [{
	          expand: true,
	          src: ['about__dish.png'],
	          cwd: 'src/img/about/',
	          dest: 'src/img/about/'
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
				files: ['dist/**/*.html', 'dist/**/*.js', 'dist/**/*.css']
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
			options: {
		         sourceMap: true,
		         outputStyle: 'compressed'
		    },
			dist: {
				files: {
					'dist/css/styles.min.css': 'src/sass/all.scss'
				}
			}
		},
		copy: {
			js:{
				src: ['js/vendor/*.js'],
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
	        		deploy_path: '/home/fhm/public_html/restaurant-template',
		        	releases_to_keep: 1,
		            host: 'freddyhm.com',
		            username: 'fhm',
		            password: '--',
		            port: 2222
		          }
		      }
		  },buildcontrol: {
		    options: {
		      dir: 'dist',
		      commit: true,
		      push: true,
		      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
		    },
		    production: {
		      options: {
		        remote: 'git@github.com:freddyhm/restaurant-template.git',
		        branch: 'production'
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
	grunt.loadNpmTasks('grunt-build-control');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');

	
	grunt.registerTask('dev-setup', ['sass', 'concat', 'includereplace', 'copy', 'uglify']);
	grunt.registerTask('prod-setup', ['sass', 'postcss', 'concat', 'uglify', 'includereplace', 'copy']);
	grunt.registerTask('deploy', ['sass', 'postcss', 'concat', 'uglify', 'includereplace', 'copy', 'ssh_deploy:production']);

	grunt.registerTask('default', ['watch']);
};
