var config = require('./config');


module.exports = function(grunt) {
	var npmTasks = 
		[   'grunt-contrib-jshint',
			'grunt-contrib-watch',
			'grunt-express-server',
			'grunt-open',
			'grunt-mocha-test'];
			
	npmTasks.forEach(function(gruntTask) {
		grunt.loadNpmTasks(gruntTask);
	});

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options:{
				jshintrc: '.jshintrc'
			},
			all: ['**/*.js',
				  '!node_modules/**/*.js',
				  '!spec/**/*.js',
				  '!tests/**/*.js']
		},
		watch: {
			files: ['**/*.js',
					'!node_modules/**/*.js'],
			jshint: {
				files: ['**/*.js',
						'!node_modules/**/*.js',
						'!spec/**/*.js',
						'!tests/**/*.js'],
				options: {
					jshintrc: '.jshintrc'
				}
			},
			express: {
				files: ['**/*.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false
				}
			}
		},
		express: {
			options: {
			},
			dev: {
				options: {
					script: './'
				}
			}
		},
		open: {
			dev: {
				path:'http://localhost:3000'
			}	
		},
		mochaTest: {
			test: {
				src: ['tests/userRouterTest.js']
			}
		}
	});

	grunt.registerTask('default', 
		[ 'jshint', 
		  'express',
		  'mochaTest',
		  'open:dev',
		  'watch']
	);
	grunt.registerTask('dev',
		[ 'jshint',
		  'express',
		  'watch']
	);

};