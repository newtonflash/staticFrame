module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'express', {
        dev :{
            options: {
                script: 'app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');

};

