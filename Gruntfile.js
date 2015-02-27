module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {            
            srcJSDir: 'public/js',
            minJSDir: 'public/js/min',
            srcCSSDir: 'public/css',
            minCSSDir:'public/css/min',
            buildFolder : "builds",
            buildVersion:"0.1.0",
        },
        
        uglify: {
          main:{
            options: {
              mangle: false              
            },
            files: {
                '<%= meta.minJSDir %>/ns.libs.min.js': 
                      [
                        '<%= meta.srcJSDir %>/libs/jquery-1.11.2.js', 
                        '<%= meta.srcJSDir %>/ns.config.js'
                      ],
                '<%= meta.minJSDir %>/ns.custom.min.js': 
                      [
                        '<%= meta.srcJSDir %>/libs/jquery.validate.js',                    
                        '<%= meta.srcJSDir %>/ns.global.js'
                      ]
            }
          }
        },          
        cssmin: {
              '<%= meta.minCSSDir %>/ns.global.min.css':
                     	  [
                     	   '<%= meta.srcCSSDir %>/global.css',
                     	   '<%= meta.srcCSSDir %>/modules.css'
                     	  ]
        },
        clean: {
              folder: "builds/"
        },
        copy:{
             main: {
              files: [
                { expand: true,  cwd: 'public/css/min/' , src:'**', dest: '<%= meta.buildFolder %>/build-<%= meta.buildVersion %>/assets/css/' },
                { expand: true,  cwd: 'public/js/min/',   src:'**', dest: '<%= meta.buildFolder %>/build-<%= meta.buildVersion %>/assets/js/' },
                { expand: true,  cwd: 'public/images/',   src:'**', dest: '<%= meta.buildFolder %>/build-<%= meta.buildVersion %>/assets/images/' },
                { expand: true,  cwd: 'public/fonts/',    src:'**', dest: '<%= meta.buildFolder %>/build-<%= meta.buildVersion %>/assets/fonts/' }
              ]
            }
        },
        accessibility: {
            options : {
                accessibilityLevel: 'WCAG2A',
                verbose: false,
                outputFormat:"json"
            },
            test : {
              src: ['http://localhost:3100/index.html']
            }
        },
        csslint: {
            options: {
              csslintrc: '.csslintrc'

            },
            lax: {
              options: {
                import: false
              },
              src: ['<%= meta.srcCSSDir %>/global.css']
            }
        },
        jshint: {
          dev:{
              options: {
                  reporter: require('jshint-html-reporter'),
                  reporterOutput: 'views/dev-jshint-report.html',
                  force:true
              },
              files: {
                src:['public/js/*.js']
              }
          },
          build:{
              options: {
                  reporter: require('jshint-html-reporter'),
                  reporterOutput: '<%= meta.buildFolder %>/build-<%= meta.buildVersion %>jshint-report.html'
              },
              all: ['<%= meta.buildFolder %>/build-<%= meta.buildVersion %>/assets/js/**/*.js']
          }
        },
        open:{
              dev : {
                  path: 'http://localhost:3100/dev-jshint-report.html'
              }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-accessibility');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask("dev", ["uglify", "cssmin", "jshint:dev", "open:dev"])
    grunt.registerTask("dev-css", ["csslint"]);
    grunt.registerTask("dev-acc", ["accessibility"]);
    grunt.registerTask('build', ["uglify", "cssmin", "clean", "copy", "jshint:build"]);
    grunt.registerTask('default', ["jshint:dev"]);

};
