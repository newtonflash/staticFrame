/** Global configuration file , which includes environment configurations, global functions
 *  @author: pradyumna
 *	@dependency jquery.js
 **/

var NameSpace = NameSpace || {};

NameSpace.cfg = NameSpace.cfg || {};
NameSpace.events = NameSpace.events || {};

;(function ($, ns, window, document, undefined){
	(function(){
		var ua = navigator.userAgent,
			isDevEnv = (location.host.indexOf("localhost") !== -1)? 1 : -1 ,
			html = document.getElementsByTagName("html")[0];
		
		ns.cfg = ns.cfg || {};
		ns.cfg.isIOS = /iPad/i.test(ua) || /iPhone/i.test(ua);
		ns.cfg.isAndroid = /Android/i.test(ua);
		ns.cfg.isIE = /MSIE (\d+\.\d+);/.test(ua);
		ns.cfg.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
		ns.cfg.isTouchEnabled = (function is_touch_device() {
									 return (('ontouchstart' in window)
										  || (navigator.MaxTouchPoints > 0)
										  || (navigator.msMaxTouchPoints > 0));
									})();
		ns.cfg.isAndroid && html.classList.add("android");
		!ns.cfg.isMobile &&	html.classList.add("no-touch");
		
		ns.cfg.breakPoints ={
			XS    :"screen and (min-width:0px) and (max-width:480px)",
			SX   :"screen and (min-width:481px) and (max-width:767px)",
			SM    :"screen and (min-width:768px) and (max-width:1024px)",
			MD    :"screen and (min-width:1025px) and (max-width:1280px)",
			LG    :"screen and (min-width:1281px)",
			XS_SX:"screen and (min-width:0px) and (max-width:767px)",
			XS_SM :"screen and (min-width:0px) and (max-width:1024px)",
			SM_MD :"screen and (min-width:768px)",
			MD_LG :"screen and (min-width:1025px)"
		}

		ns.events = {
			WINDOW_RESIZE : "ml/screen/resize/",
			WINDOW_LOAD : "ml/window/load/",
			SCROLL : "ml/mouse/scroll",
			VIEWPORT_CHANGE : "ml/viewport/change", //for responsive implementation
			INIT_MODULES : "ml/modules/init",
			VIEWPORT_XS:"viewport/extrasmall",
			VIEWPORT_SX:"viewport/smallExtended",
			VIEWPORT_SM:"viewport/small",
			VIEWPORT_MD:"viewport/medium",
			VIEWPORT_LG:"viewport/large",
			VIEWPORT_XS_SX:"viewport/mobile",
			VIEWPORT_XS_SM:"viewport/mobileAndTablet",
			VIEWPORT_SM_MD:"viewport/tabletAndAbove",
			VIEWPORT_MD_LG:"viewport/desktopAndAbove"
		}
		ns.cfg.viewport = ns.events.VIEWPORT_LG;

	})();

	/** Global functionality that needs to be placed before anything happens on the page.
	 *  1. Resize event binding, and publishing
	 *  2. Scroll binding based on IE or other browser
	 *  3. Setting up mediaQuery breakpoints and adding eventlisteners to trigger publishing VIEWPORT_CHANGE EVENT
	 **/
	$(document).ready(function(){

		// avoid subscribing to WINDOW_RESIZE event where ever possible
		$(window).resize( $.throttle( 250, function(){
			$.publish(ns.events.WINDOW_RESIZE);
		}));

		if( ns.cfg.isIE ){
			$(window).scroll( $.throttle( 500, function(){
				$.publish(ns.events.SCROLL);
			}));
		} else{
			$(window).scroll( $.throttle( 20, function(){
				$.publish(ns.events.SCROLL);
			}));
		}
		// for first time before module initialization
		for ( var breakPoint in  ns.cfg.breakPoints){
			;(function(breakName, mediaQuery){
				var handler = function(data){
					if(data.matches){
						if(/\bSM\b|\bMD\b|\bLG\b|\bSMX\b|\bXS\b/.test(breakName)) {
							ns.cfg.viewport = breakName;
						}
					}
				}
				handler({
					media: mediaQuery,
					matches: matchMedia(mediaQuery).matches
				});
			})(breakPoint, ns.cfg.breakPoints[breakPoint]);
		};
		$.publish(ns.events.INIT_MODULES);

		// publish events on viewport change based on media queries, after document ready
		for ( var breakPoint in  ns.cfg.breakPoints){
			;(function(breakName, mediaQuery){
				var handler = function(data){
					if(data.matches){
						var vpAlias = "VIEWPORT_"+breakName;
						$.publish(ns.events[vpAlias], true);

						if(/\bSM\b|\bMD\b|\bLG\b|\bSMX\b|\bXS\b/.test(breakName)) {
							ns.cfg.viewport = breakName;
							$.publish(ns.events.VIEWPORT_CHANGE);
						}
					} else {
						$.publish(ns.events["VIEWPORT_"+breakName], false);
					}
				}
				handler({
					media: mediaQuery,
					matches: matchMedia(mediaQuery).matches
				});
				window.matchMedia(mediaQuery).addListener(handler);

			})(breakPoint, ns.cfg.breakPoints[breakPoint]);
		};

	});
	$(window).load(function(){
		$.publish(ns.events.WINDOW_LOAD);
	});
})(jQuery, NameSpace, this, this.document);


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
