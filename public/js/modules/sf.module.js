/**
 *   sample module
 *
 *   @project    < write project name here >
 *   @date       < put date here >
 *   @author     < author name >
 *   @site       < site name >
 */
(function($, sf, window, document, undefined) {

    "use strict";

    var ModuleName = function() {
        /**
         * add all event listeners
         */
        var initEventListeners = function() {

        };

        /**
         * put all event triggers, plugin initializations
         */
        var initEventTriggers = function() {

        };

        /**
         *  define what needs to be done after all stuff
         *  has been loaded in to the browser
         **/
        this.onLoad = function() {};

        this.init = function() {
            initEventListeners();
            initEventTriggers();
        };
        /**
         * Initialize this object when document ready event is triggered
         */
        $.subscribe(sf.events.INIT_MODULES, this.init);
        $.subscribe(sf.events.WINDOW_LOAD, this.onLoad);

    };

    sf.moduleName = new ModuleName();

})(jQuery, window.SF || {}, window, window.document);
