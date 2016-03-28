module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'cssmin', {
        '<%= meta.minCSSDir %>/ns.global.min.css':
        [
            '<%= meta.srcCSSDir %>/sf-global.css',
            '<%= meta.srcCSSDir %>/modules.css'
        ]
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');

};


