var siteConfig = require('./site-config.js'),
config = function(){
  return siteConfig;
}


module.exports = function(grunt) {

    'use strict';

    var siteConf = config();

    require ('load-grunt-tasks')( grunt );


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            srcJSDir: 'public/js',
            minJSDir: 'public/js/min',
            srcCSSDir: 'public/css',
            minCSSDir:'public/css/min',
            buildFolder : "builds"
        }
    });

    grunt.loadTasks('core/grunt_tasks');


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
    grunt.registerTask('build', ["clean", "copy"]);

    /**
     * Same as build but only exports minified files
     */
    grunt.registerTask('minify-and-build', ["uglify", "cssmin", "clean:build", "copy:minifiedBuild"]);

};
