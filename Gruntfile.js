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
                        '<%= meta.srcJSDir %>/ns.preinit.js'
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
                  path: 'http://localhost:3100/'
              },
              report:{
                  path: 'http://localhost:3100/dev-jshint-report.html' 
              }
        },
        compass: {
              compiled: {
                    options: {
                          sassDir: 'resources/scss',
                          cssDir: 'public/css/',
                          imagesDir: 'public/images',
                          javascriptsDir: 'public/js',
                          fontsDir: 'public/fonts',
                          relativeAssets: true,
                          outputStyle: "expanded", // optional : nested, expanded, compact, compressed,
                          noLineComments : true
                    }
              }
        },
        express: {
              dev :{
                options: {
                    script: 'app.js'
                }
              }
        },
        watch: {
              compass :{
                    files: ['resources/scss/**'],
                    tasks: ['compass:compiled']
              },
              express:{
                    files:  ['app.js'],
                    tasks:  ['express:dev']
              }
        },
        file_append: {
          default_options: {
            files: [
              {
                append: "<link rel='stylesheet' type='text/css' href='/css/jshint-reporter.css'><script src='/js/ns.jshint-reporter.js'></script>",
                input: 'node_modules/jshint-html-reporter/templates/bootstrap/body.html',
                output: 'node_modules/jshint-html-reporter/templates/bootstrap/body.html'
              }
            ]
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
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-file-append');
    /**
     *  grunt                       : start the server & watch scss
     *  grunt report                : creates js hint report
     *  grunt report-css            : creates CSSlint report
     *  grunt build                 : it uglifies, minifies, cleans build directory and creates a new build file.
     *  grunt dev-minify            : minifies and uglifies css and js files.
     *
     *  OPTIONAL
     * --------------------------------------------------------
     *  grunt watch-sass            : watches scss files - run this only when you start node sever with node command
     *  
     */
    grunt.registerTask('default', ["express:dev", "open:dev", "watch"]);
    grunt.registerTask('server', ["express:dev","open:dev", "watch"]);
    grunt.registerTask("report", ["file_append", "jshint:dev", "open:report"]);
    grunt.registerTask("report-css", ["csslint"]);
    grunt.registerTask('build', ["uglify", "cssmin", "clean", "copy", "jshint:build","file_append"]);
    grunt.registerTask("dev-minify", ["uglify", "cssmin"]);   
    //OPTIONAL
    grunt.registerTask("dev-acc", ["accessibility"]);
    grunt.registerTask("watch-sass", ["watch:compass"])
    

};
