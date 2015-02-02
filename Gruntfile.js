module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {            
            srcJS: 'public/js',
            deployJS: 'public/js',
            srcCSS: 'public/css',
            deplyCSS:'public/css'
        },
        
        uglify: {
            options: {
              mangle: false              
            },
            my_target: {
              files: {
                  '<%= meta.deployJS %>/ns.libs.min.js': 
                        [
                          '<%= meta.srcJS %>/libs/jquery-1.11.2.js', 
                          '<%= meta.srcJS %>/libs/jquery.validate.js',                    
                          '<%= meta.srcJS %>/ns.config.js'
                        ],
                  '<%= meta.deployJS %>/ns.custom.min.js': 
                        [
                          '<%= meta.srcJS %>/ns.global.js'
                        ]
              }
            }
          },          
        cssmin: {
          add_banner: {            
            files: {
              '<%= meta.deplyCSS %>/ns.global.min.css':
                     	  [
                     	   '<%= meta.srcCSS %>/global.css',
                     	   '<%= meta.srcCSS %>/modules.css'
                     	  ]
            }
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task.
    //grunt.registerTask('default', ['concat']);
    grunt.registerTask('default', ['uglify','cssmin',]);
};
