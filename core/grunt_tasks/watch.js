
module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'watch', {
        compass :{
            files: ['resources/scss/**'],
            tasks: ['compass:compiled']
        },
        express:{
            files:  ['app.js', 'routes/*'],
            tasks:  ['express:dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
