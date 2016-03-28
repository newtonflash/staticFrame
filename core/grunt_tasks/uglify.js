module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'uglify', {
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
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};


