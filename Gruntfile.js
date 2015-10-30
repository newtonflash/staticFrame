var siteConfig = require('./site-config.js'),
config = function(){
  return siteConfig;
}
module.exports = function(grunt) {
    var siteConf = config();
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
                        '<%= meta.srcJSDir %>/sf.preinit.js'
                      ],
                '<%= meta.minJSDir %>/ns.custom.min.js': 
                      [
                        '<%= meta.srcJSDir %>/libs/jquery.validate.js',                    
                        '<%= meta.srcJSDir %>/sf.global.js'
                      ]
            }
          }
        },          
        cssmin: {
              '<%= meta.minCSSDir %>/ns.global.min.css':
                     	  [
                     	   '<%= meta.srcCSSDir %>/sf-global.css',
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
              src: ['<%= meta.srcCSSDir %>/sf-global.css']
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
                  path: 'http://localhost:'+siteConf.portNo+'/'
              },
              report:{
                  path: 'http://localhost:'+siteConf.portNo+'/dev-jshint-report.html' 
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
                    files:  ['app.js', 'routes/*'],
                    tasks:  ['express:dev']
              }
        },
        file_append: {
          default_options: {
            files: [
              {
                append: "<script src='https://code.jquery.com/jquery-1.11.3.js'></script><script src='/js/ns.jshint-reporter.js'></script><link rel='stylesheet' type='text/css' href='/css/jshint-reporter.css'>",
                input: 'views/dev-jshint-report.html',
                output:'views/dev-jshint-report.html'
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
     * Start grunt server
     */
    grunt.registerTask('default', ["express:dev",  "watch"]);

    /**
     * start grunt server and open index page in the default browser
     */
    grunt.registerTask('open', ["express:dev","watch", "open:dev"]);

    /**
     * Open jshint report in browser
     */
    grunt.registerTask("report-js", ["jshint:dev", "file_append","open:report-js"]);

    /**
     * Open CSSlint report in browser
     */
    grunt.registerTask("report-css", ["jshint:dev", "file_append","open:report-css"]);

    /**
     * Open HTML & accessibility issues in browser
     */
    grunt.registerTask("report-html", ["jshint:dev", "file_append","open:report-html"]);

    /**
     * Create a build folder out of working copy - this would create a HTML based site structure.
     * Note it does not include any json/HTML services. If you need to include then add the service folder to build
     * copy task.
     */
    grunt.registerTask('build', ["clean", "copy", "file_append"]);

    /**
     *
     */
    grunt.registerTask('minify-and-build', ["uglify", "cssmin:build", "clean:build", "copy:build", "file_append"]);

};
