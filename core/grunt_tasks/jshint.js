module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'jshint', {
        dev:{
            options: {
                reporter: require('jshint-html-reporter'),
                reporterOutput: 'views/dev-jshint-report.html',
                force:true
            },
            files: {
                src:['public/js/*.js', '!public/libs/*.js']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
