module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jqueryCheck : 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',
        // uglify: {
        //     options: {
        //         banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //     },
        //     build: {}
        // },
        concat: {
            build: {
                files : [
                    {
                        src: [
                            'node_modules/jquery/dist/jquery.min.js',
                            'node_modules/bootstrap/dist/js/bootstrap.min.js',
                            'assets/js/contact_me.js',
                            'assets/js/freelancer.min.js',
                            'assets/js/jqBootstrapValidation.js',
                        ],
                        dest: 'public/js/app.js'
                    },
                    {
                        src: [
                            'node_modules/bootstrap/dist/css/bootstrap.min.css',
                            'node_modules/font-awesome/css/font-awesome.min.css'
                        ],
                        dest: 'public/css/app.css'
                    }
                ]
            }            
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/font-awesome/fonts/',
                        src: '**',
                        dest: 'public/font/',
                        flatten: true,
                        filter: 'isFile',
                    },
                ],
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'copy']);//uglify

};