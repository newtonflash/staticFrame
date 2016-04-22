module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'copy', {
        main: {
            files: [
                { expand: true,  cwd: 'public/css/' , src:['**/*.css', "!jshint-reporter.css"], dest: '<%= meta.buildFolder %>/css/' },
                { expand: true,  cwd: 'public/js/',   src:['**/*.js', "!sf.jshint-reporter.js"], dest: '<%= meta.buildFolder %>/js/' },
                { expand: true,  cwd: 'public/images/',   src:'**', dest: '<%= meta.buildFolder %>/images/' },
                { expand: true,  cwd: 'public/fonts/',    src:'**', dest: '<%= meta.buildFolder %>/fonts/' }
            ]
        },
        minifiedBuild : {
            files: [
                { expand: true,  cwd: 'public/css/' , src:['**/*.css', "!jshint-reporter.css"], dest: '<%= meta.buildFolder %>/css/' },
                { expand: true,  cwd: 'public/js/',   src:['**/*.js', "!sf.jshint-reporter.js"], dest: '<%= meta.buildFolder %>/js/' },
                { expand: true,  cwd: 'public/images/',   src:'**', dest: '<%= meta.buildFolder %>/images/' },
                { expand: true,  cwd: 'public/fonts/',    src:'**', dest: '<%= meta.buildFolder %>/fonts/' }
            ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');

};
