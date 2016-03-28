module.exports = function( grunt ) {

    'use strict';

    grunt.config( 'compass', {
        compiled: {
            options: {
                sassDir: 'resources/scss',
                cssDir: 'public/css/',
                imagesDir: 'public/images',
                javascriptsDir: 'public/js',
                fontsDir: 'public/fonts',
                relativeAssets: true,
                outputStyle: "expanded", // optional : nested, expanded, compact, compressed,
                noLineComments : true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');

};
