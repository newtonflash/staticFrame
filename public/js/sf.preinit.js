/**
 *    Global configuration file , which includes environment configurations, global functions that are needed to run any module.
 *    @dependency jquery.js
 **/

var SF = window.SF || {};


SF.extend = function(ns){
    'use strict';

    var parts = ns.split( '.'),
        parent = this,
        pl,
        i;

    if ( parts[ 0 ] === 'SF' ) {
        parts = parts.slice( 1 );
    }

    for ( i = 0, pl = parts.length; i < pl; i++ ) {
        if ( typeof parent[ parts[ i ] ] === 'undefined' ) {
            parent[ parts[ i ] ] = {};
        }
        parent = parent[ parts[ i ] ];
    }
    return parent;
};

;(function ($, sf, window, document, undefined) {
    (function () {
        var ua = navigator.userAgent,
            html = document.getElementsByTagName("html")[0],
            cfg = sf.extend("SF.cfg"),
            events = sf.extend("SF.events");

        cfg.isDevEnv = (location.host.indexOf("localhost") !== -1) ? 1 : -1;
        cfg.isIOS = /iPad/i.test(ua) || /iPhone/i.test(ua);
        cfg.isAndroid = /Android/i.test(ua);
        cfg.isIE = /MSIE (\d+\.\d+);/.test(ua) || /Trident\/7\./.test(ua);
        cfg.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
        cfg.isTouchEnabled = (function is_touch_device() {
            return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
        })();

        if (ua.match(/Windows Phone/i)) {
            html.classList.add("win-phone");
        }

        if (ua.match(/iemobile/i)) {
            html.classList.add("ie-mobile");
        }

        if (cfg.isAndroid) html.classList.add("android");
        if (!cfg.isMobile) html.classList.add("mobile");
        if (cfg.isIE) html.classList.add("ie");

        /**
         *  based on desktop first approach.
         *  Add your custom media querry here and add the same name in events as well so that it can trigger
         */

        cfg.breakPoints = {
            XSVP: "screen and (max-width:479px)",
            SVP: "screen and (max-width:767px)",
            MVP: "screen and (max-width:991px)",
            LVP: "screen and (max-width:1199px)",
            XLVP: "screen and (max-width:1599px)",
            XSVP_ONLY: "screen and (min-width:0px) and (max-width:479px)",
            SVP_ONLY: "screen and (min-width:480px) and (max-width:767px)",
            MVP_ONLY: "screen and (min-width:768px) and (max-width:991px)",
            LVP_ONLY: "screen and (min-width:992px) and (max-width:1199px)",
            XLVP_ONLY: "screen and (min-width:1200px) and (max-width:1599px)"
        };

        sf.events = {
            WINDOW_RESIZE: "sf/resize",
            WINDOW_LOAD: "sf/load",
            SCROLL: "sf/scroll",
            INIT_MODULES: "sf/init/",

            VIEWPORT_CHANGE: "sf/viewport/change/",
            XSVP: "sf/viewport/extraExtraSmallViewport",
            SVP: "sf/viewport/smallViewPort",
            MVP: "sf/viewport/mediumViewPort",
            LVP: "sf/viewport/largeViewPort",
            XLVP: "sf/viewport/extraLargeScreen",
            XSVP_ONLY: "sf/viewport/extraSmallViewPortOnly",
            SVP_ONLY: "sf/viewport/smallViewPortOnly",
            MVP_ONLY: "sf/viewport/mediumViewPortOnly",
            LVP_ONLY: "sf/viewport/largeViewPortOnly",
            XLVP_ONLY: "sf/viewport/extraLargeViewPortOnly"
        };

    })();

    /** Global functionality that needs to be placed before anything happens on the page.
     *  1. Resize event binding, and publishing
     *  2. Scroll binding based on IE or other browser
     *  3. Setting up mediaQuery breakpoints and adding eventlisteners to trigger publishing VIEWPORT_CHANGE EVENT
     **/

    $(document).ready(function () {
        var uniqueBreakPointRegex = /\bXSVP_ONLY\b|\bSVP_ONLY\b|\bMVP_ONLY\b|\bLVP_ONLY\b|\bXLVP_ONLY\b/,
            mediaQuery;

        sf.root = $('body'); // this is for caching body for faster search inside it.

        // avoid subscribing to WINDOW_RESIZE event where ever possible
        $(window).resize($.throttle(250, function () {
            $.publish(sf.events.WINDOW_RESIZE);
        }));

        if (sf.cfg.isIE) {
            $(window).scroll($.throttle(500, function () {
                $.publish(sf.events.SCROLL);
            }));
        } else {
            $(window).scroll($.throttle(20, function () {
                $.publish(sf.events.SCROLL);
            }));
        }

        // for first time before module initialization
        for (breakPoint in sf.cfg.breakPoints) {
            mediaQuery = sf.cfg.breakPoints[breakPoint];
            if (matchMedia(mediaQuery).matches) {
                if (uniqueBreakPointRegex.test(breakPoint)) {
                    sf.cfg.viewport = breakPoint;
                }
            }
        }

        $.publish(sf.events.INIT_MODULES);

        // publish events on viewport change based on media queries, after document ready
        for (var breakPoint in  sf.cfg.breakPoints) {
            (function (breakName, mediaQuery) {
                var handler = function (data) {
                    if (data.matches) {
                        $.publish(sf.events[breakName], true);

                        if (uniqueBreakPointRegex.test(breakName)) {
                            sf.cfg.viewport = breakName;
                            $.publish(sf.events.VIEWPORT_CHANGE);
                        }
                    } else {
                        $.publish(sf.events[breakName], false);
                    }
                };
                handler({
                    media: mediaQuery,
                    matches: matchMedia(mediaQuery).matches
                });
                window.matchMedia(mediaQuery).addListener(handler);

            })(breakPoint, sf.cfg.breakPoints[breakPoint]);
        }
    });

    $(window).load(function () {
        $.publish(sf.events.WINDOW_LOAD);
    });
})(jQuery, SF, this, this.document);


/** ============================================================================
 jQuery Tiny Pub/Sub - v0.7 - 10/27/2011 http://benalman.com/
===============================================================================*/
;(function(a){var b=a({});a.subscribe=function(){b.on.apply(b,arguments)},a.unsubscribe=function(){b.off.apply(b,arguments)},a.publish=function(){b.trigger.apply(b,arguments)}})(jQuery);

/** ===========================================================================
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * Copyright (c) 2010 "Cowboy" Ben Alman
===============================================================================*/
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/**============================================================================
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 *=============================================================================*/
;(function(){window.console||(window.console={});for(var b="log info warn error debug trace dir group groupCollapsed groupEnd time timeEnd profile profileEnd dirxml assert count markTimeline timeStamp clear".split(" "),a=0;a<b.length;a++)window.console[b[a]]||(window.console[b[a]]=function(){})})();

/**=============================================================================
 Few functions to provide support for IE 8 : Array.indexOf and Array.move
===============================================================================*/
Array.indexOf||(Array.prototype.indexOf=function(b){for(var a=0,c=this.length;a<c;a++)if(this[a]===b)return a;return-1});
Array.move||(Array.prototype.move=function(b,a){if(a>=this.length)for(var c=a-this.length;c--+1;)this.push(void 0);this.splice(a,0,this.splice(b,1)[0])});
