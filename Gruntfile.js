module.exports = function(grunt) {

    // load all grunt task
    require('grunt-task-loader')(grunt, {
        mapping: {
            sass_globbing: 'grunt-sass-globbing',
        }
    });

    grunt.initConfig({

        // Package
        pkg: grunt.file.readJSON('package.json'),


        sass_globbing: {
            sb: {
                files: {
                    'assets/scss/style.scss': [
                        'node_modules/jeet/scss/index.scss',
                        'node_modules/breakpoint-sass/stylesheets/_breakpoint.scss',
                        'assets/scss/common/**/*.scss',
                        'assets/scss/pages/**/*.scss'
                    ]
                },
                options: {
                    useSingleQuotes: false
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'build/css/style.css': 'assets/scss/style.scss'
                },
                options: {
                    compass: true,
                    // style: 'expanded',
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['ie >= 9']
                 },
                 expand:true,
                 src: 'build/css/style.css',
                 dest: ''
            }
        },

        // Clean
        clean: {
            post: ['.sass-cache']
        },

        // Copy files from assets
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/font/',
                    src: ['*.{eot,svg,ttf,woff,woff2}'],
                    dest: 'build/font/'
                },
                {
                  expand: true,
                  cwd: 'assets/img/',
                  src: ['**'],
                  dest: 'build/img/',
                }]
            }
        },

        // Watch
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['assets/scss/**/*.{sass,scss}', '*.html'],
                tasks: ['sass_globbing', 'sass', 'autoprefixer', 'copy']
            }
        },

        // live reload
        express: {
            all: {
                options: {
                    port: 8000,
                    hostname: '*',
                    bases: ['.'],
                    livereload: true
                }
            }
        }

    });

    // Register Grunt tasks
    grunt.registerTask('default', ['clean', 'sass_globbing', 'sass', 'autoprefixer', 'copy', 'clean:post']);
    grunt.registerTask('server', ['express', 'watch']);

};
