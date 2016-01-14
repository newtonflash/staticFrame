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
            buildFolder : "builds"
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
                { expand: true,  cwd: 'public/css/' , src:['**/*.css', "!jshint-reporter.css"], dest: '<%= meta.buildFolder %>/css/' },
                { expand: true,  cwd: 'public/js/',   src:['**/*.js', "!sf.jshint-reporter.js"], dest: '<%= meta.buildFolder %>/js/' },
                { expand: true,  cwd: 'public/images/',   src:'**', dest: '<%= meta.buildFolder %>/images/' },
                { expand: true,  cwd: 'public/fonts/',    src:'**', dest: '<%= meta.buildFolder %>/fonts/' }
              ]
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
                src:['public/js/*.js', '!public/js/sf.preinit.js', '!public/js/sf.jshint-reporter.js']
              }
          }
        },
        open:{
              dev : {
                  path: 'http://localhost:'+siteConf.portNo+'/'
              },
              jsreport:{
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
                append: "<script src='https://code.jquery.com/jquery-1.11.3.js'></script><script src='/js/sf.jshint-reporter.js'></script><link rel='stylesheet' type='text/css' href='/css/jshint-reporter.css'>",
                input: 'views/dev-jshint-report.html',
                output:'views/dev-jshint-report.html'
              }
            ]
          }
        },
        ejs:{
            build:{
                options : siteConf,
                cwd:"views/",
                src:['**/*.html', "!dev-jshint-report.html","!404.html"],
                dest: 'builds/',
                expand: true,
                ext: ".html"
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-ejs');

    /**
     * Start grunt server
     */
    grunt.registerTask('default', ["express:dev",  "watch"]);

    /**
     * start grunt server and open index page in the default browser
     */
    grunt.registerTask('server', ["express:dev","watch", "open:dev"]);

    /**
     * Open jshint report in browser
     */
    grunt.registerTask("report-js", ["jshint:dev", "open:jsreport"]);

    /**
     * Open CSSlint report in browser
     */
    //WIP grunt.registerTask("report-css", ["jshint:dev", "file_append","open:report-css"]);

    /**
     * Open HTML & accessibility issues in browser
     */
    //WIP grunt.registerTask("report-html", ["jshint:dev", "file_append","open:report-html"]);

    /**
     * Create a build folder out of working copy - this would create a HTML based site structure.
     * Note it does not include any json/HTML services. If you need to include then add the service folder to build
     * copy task.
     */
    grunt.registerTask('build', ["clean", "copy", "ejs:build"]);

    /**
     * Same as build but only exports minified files
     */
    grunt.registerTask('minify-and-build', ["uglify", "cssmin:build", "clean:build", "copy:build"]);

};
