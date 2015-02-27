'use strict';

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        app: 'src',
        dist: 'dist',
        build: 'build'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= config.app %>/js/**/*.js'],
                tasks: ['jshint', 'jscs', 'newer:copy:build'],
                options: {
                    livereload: true
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['<%= config.app %>/styles/**/*.{less,css}'],
                tasks: ['less:build', 'autoprefixer:build']
            },
            html: {
                files: ['<%= config.app %>/**/*.html'],
                tasks: ['newer:copy:build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.build %>/**/*.html',
                    '<%= config.build %>/styles/**/*.css',
                    '<%= config.build %>/js/**/*.js',
                    '<%= config.build %>/img/**/*'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.build %>',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            build: '<%= config.build %>'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/js/**/*.js',
                '!<%= config.app %>/js/vendor/*'
            ]
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/js/**/*.js',
                '!<%= config.app %>/js/vendor/*'
            ]
        },

        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts/scripts.js': [
                        '<%= config.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },

        // Compiles less to CSS and generates necessary files if requested
        less: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css':
                        '<%= config.app %>/styles/less/styles.less'
                }
            },
            build: {
                files: {
                    '<%= config.build %>/styles/main.css':
                        '<%= config.app %>/styles/less/styles.less'
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'Opera 12.1'
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/styles/',
                    src: '**/*.css',
                    dest: '<%= config.dist %>/styles/'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.build %>/styles/',
                    src: '**/*.css',
                    dest: '<%= config.build %>/styles/'
                }]
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/styles/',
                    src: '**/*.css',
                    dest: '<%= config.dist %>/styles/'
                }]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '**/*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '**/*.html',
                        'js/**/*.*',
                        'styles/fonts/**/*.*'
                    ]
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.build %>',
                    src: [
                        '*.{ico,png,txt}',
                        '**/*.html',
                        'js/**/*.*',
                        'styles/fonts/**/*.*',
                        'img/**/*.{gif,jpeg,jpg,png}'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            build: [
                'less:build',
                'copy:build'
            ],
            dist: [
                'less:dist',
                'imagemin',
                'copy:dist'
            ]
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            build: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static(config.build)
                        ];
                    }
                }
            }
        }
    });

    grunt.registerTask('build', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:build',
                'concurrent:build',
                'autoprefixer'
            ]);
        }

        grunt.task.run([
            'connect:build',
            'watch'
        ]);
    });

    grunt.registerTask('dist', [
        'clean:dist',
        'concurrent:dist',
        'autoprefixer',
        'cssmin'
    ]);
};
