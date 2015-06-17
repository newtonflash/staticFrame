/**
*             global.js
*   Global footer file
*
*   @project    < write project name here >
*   @date       < put date here > 
*   @author     < author name >  
*   @site       < site name >
*/

(function ($, ns, window, document, undefined) {
                
                "use strict";
    
                var Global = function () {
                                /**
                                *            add all event listeners
                                */
                                var initEventListeners = function () {
                                                
                                };
        
                                /**
                                *            put all event triggers, plugin initializations
                                */
                                var initEventTriggers = function () {

                                };
        
        /**
         *  define what needs to be done after all stuff 
         *  has been loaded in to the browser
         **/
        this.onLoad = function () {
        };
        
        this.init = function () {
                                                initEventListeners();
                                                initEventTriggers();
                                };
                                /**
                                * Initialize this object when document ready event is triggered
                                */
                                $.subscribe(ns.events.INIT_MODULES, this.init);
        $.subscribe(ns.events.WINDOW_LOAD, this.onLoad);
        
                };

                ns.global = new Global();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null, window.NameSpace || {}, window, window.document);
