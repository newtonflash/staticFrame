var siteConfig = require('../../site-config.js'),
    config = function(){
        return siteConfig;
    }

module.exports = function( grunt ) {

    'use strict';

    var siteConf = config();

    grunt.config( 'ejs', {
        build:{
            options : siteConf,
            cwd:"views/",
            src:['**/*.html', "!dev-jshint-report.html","!404.html"],
            dest: 'builds/',
            expand: true,
            ext: ".html"
        }
    });

    grunt.loadNpmTasks('grunt-ejs');

};
