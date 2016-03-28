var siteConfig = require('../../site-config.js'),
    config = function(){
        return siteConfig;
    }

module.exports = function( grunt ) {
    'use strict';

    var siteConf = config();

    grunt.config( 'open', {
        dev : {
            path: 'http://localhost:'+siteConf.portNo+'/'
        },
        jsreport:{
            path: 'http://localhost:'+siteConf.portNo+'/dev-jshint-report.html'
        }
    });

    grunt.loadNpmTasks('grunt-open');
};
