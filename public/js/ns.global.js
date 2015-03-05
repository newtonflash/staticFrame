/**
 *	global.js
 * 	Global footer file
 *
 *  @project    < write project name here >
 *  @date       < put date here > 
 *  @author  	< author name >	
 * 	@site       < site name >
 */

 (function($, ns, window, document, undefined){
	
	"use strict";

	var _global = function(){
		this.init = function(){
			initEventListeners();
			initEventTriggers();
		};

		/**
		 *	add all event listeners
		 */
		var initEventListeners = function(){
			
		};
		
		/**
		 *	put all event triggers, plugin initializations
		 */
		var initEventTriggers = function(){

		};

		/**
		 * Initialize this object when document ready event is triggered
		 */
		$.subscribe(ns.events.INIT_MODULES, this.init);
	};

	NameSpace.global = new _global();

})((typeof jQuery !== "undefined") ? jQuery : null, NameSpace || {}, window, window.document);