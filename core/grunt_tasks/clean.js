module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'clean', {
        main : {
            folder: "builds/"
        },
        build : {
            folder: "builds/"
        }

    });
    grunt.loadNpmTasks('grunt-contrib-clean');

};
