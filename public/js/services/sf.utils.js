/**
 *   Utilities to be used by all javascript files
 *
 *   @project    < your project name >
 *   @date       < dd/mm/yyy >
 *   @author     < your name >
 */

(function($, ns, window, document, undefined) {

    "use strict";

    var Utils = function() {

        var getFullDayName = function(date) {
            return [
                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ][date.getDay() + 1];
        };

        var getFullMonth = function(date) {
            return [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ][date.getMonth()];
        };

        return {

            //get window size
            windowSize: function() {
                var size = [0, 0];
                if (typeof window.innerWidth !== 'undefined') {
                    size = [window.innerWidth, window.innerHeight];
                } else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
                    size = [document.documentElement.clientWidth, document.documentElement.clientHeight];
                } else {
                    size = [document.getElementsByTagName('body')[0].clientWidth, document.getElementsByTagName('body')[0].clientHeight];
                }
                return size;
            },

            scrollToElement: function($el, padding) {
                padding = padding || 0;
                $('html, body').animate({
                    scrollTop: $el.offset().top - padding
                }, 500);
            },

            timeToFullDateFormat: function(time) {

                var d = new Date(parseInt(time, 10)),
                    day = getFullDayName(d),
                    month = getFullMonth(d);
                return day + " " + d.toDateString().substr(8, 2) + " " + month + " " + d.getFullYear();
            },

            formatFileSize: function(bytes) {
                if (typeof bytes !== 'number') {
                    return '';
                }

                if (bytes >= 1000000000) {
                    return (bytes / 1000000000).toFixed(2) + ' GB';
                }
                if (bytes >= 1000000) {
                    return (bytes / 1000000).toFixed(2) + ' MB';
                }

                return (bytes / 1000).toFixed(2) + ' KB';
            },

            hasProperty: function(obj, key) {
                return Object.prototype.hasOwnProperty.call(obj, key);
            },

            getParameterByName: function(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            },

            isArrayContains: function(array, code) {
                return -1 < array.map(function(item) {
                        return item;
                    }).indexOf(code);
            },

            sortArrayByPropertyValue: function(prop) {
                return function(a, b) {
                    if (a[prop] > b[prop]) {
                        return 1;
                    } else if (a[prop] < b[prop]) {
                        return -1;
                    }
                    return 0;
                };
            },

            setURLParameter: function(paramName, paramValue) {
                var url = window.location.href;
                if (url.indexOf(paramName + "=") >= 0) {
                    var prefix = url.substring(0, url.indexOf(paramName));
                    var suffix = url.substring(url.indexOf(paramName));
                    suffix = suffix.substring(suffix.indexOf("=") + 1);
                    suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
                    url = prefix + paramName + "=" + paramValue + suffix;
                } else {
                    if (url.indexOf("?") < 0)
                        url += "?" + paramName + "=" + paramValue;
                    else
                        url += "&" + paramName + "=" + paramValue;
                }
                window.location.href = url;
            }
        };

    };

    ns.utils = new Utils();

})(window.jQuery, window.SF || {}, window, window.document);