module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'csslint', {
        options: {
            csslintrc: '.csslintrc'

        },
        lax: {
            options: {
                import: false
            },
            src: ['<%= meta.srcCSSDir %>/sf-global.css']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-csslint');
};

