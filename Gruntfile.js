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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('default', ["uglify", "cssmin", "clean", "copy"]);

};
