module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'uglify', {
        main:{
            options: {
                mangle: false
            },
            files: {
                '<%= meta.minJSDir %>/sf.libs.min.js':
                    [
                        '<%= meta.srcJSDir %>/libs/jquery-1.11.2.js',
                        '<%= meta.srcJSDir %>/libs/sf.preinit.js',
                        '<%= meta.srcJSDir %>/libs/jquery.validate.js'
                    ],
                '<%= meta.minJSDir %>/sf.custom.min.js':
                    [
                        '<%= meta.srcJSDir %>/sf.global.js'
                    ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
};


