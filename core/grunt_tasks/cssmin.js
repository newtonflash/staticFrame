module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'cssmin', {
        '<%= meta.minCSSDir %>/sf.global.min.css':
        [
            '<%= meta.srcCSSDir %>/sf-global.css'
        ]
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');

};


