module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Configure jshint
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js'],
            test: ['src/**/*.js', 'test/**/*.js']
        },

        // Configure jscs
        jscs: {
            src: 'src/**/*.js',
            test: 'src/**/*.js'
        },

        // Configure express server
        express: {
            all: {
                options: {
                    script: 'src/app.js'
                }
            }
        },

        // Configure watch
        watch: {
            files: ['src/**/*.js', 'Gruntfile.js'],
            tasks: ['jshint', 'jscs', 'express'],
            options: {
                spawn: false
            }
        },

        //Configure mocha tests
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });
    grunt.registerTask('default', [
        'jshint',
        'jscs',
        'express',
        'watch'
    ]);
    grunt.registerTask('test', [
        'jshint:test',
        'jscs:test',
        'mochaTest:test'
    ]);
};
