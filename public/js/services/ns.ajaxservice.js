/**
 *   services.js
 *
 *   @project    < write project name here >
 *   @date       < put date here >
 *   @author     < author name >
 *   @site       < site name >
 */
(function($, ns, window, document, undefined) {

    "use strict";

    var AjaxService = function() {
        var self = this,
            requestQueue = [],
            defaults = {
                url:"",
                data:{},
                dataType:"JSON",
                before:{},
                success:{},
                type:"GET",
                cache: true,
                contentType: 'application/json',
                crossDomain: false,
                timeout: 60000,
                defaultErrorHandler:true,
                error:{},
                mime:"application/json",
                preLoader:false,
                preLoaderTarget:null

            },
            defaultPostOptions = $.extend(true, defaults , {
                type:"POST"
            });

        var ajax = function(serviceName, options){

            var serviceURL = options.url,
                ajaxParams,
                successCallback= options.success,
                errorCallBack = option.error;

            if(serviceURL && serviceURL !== ""){
                //abort the service if called multiple times before one service cycle ends
                if(requestQueue[serviceName] && options.allowMultiple == false){
                    requestQueue[serviceName].abort();
                }
                ajaxParams = {
                    url: options.url,
                    cache: options.cache,
                    dataType: options.dataType,
                    data: options.data,
                    type: options.type,
                    mimeType: options.mime,
                    status:{
                        404: function{
                            //track down what needs to be done
                        },
                        302: function{
                            // this is good for what?
                        }
                    },
                    beforeSend: function (jqXHR, settings) {
                        if (options.preloader === true && $(options.preloaderTarget)[0]) {
                            $(options.preloaderTarget).addClass("loading");
                        }
                        if (typeof option.beforeSend === "function") {
                            option.beforeSend(jqXHR, settings);
                        }
                    },
                    success: function (response, textStatus, jqXHR) {

                        ns.ajaxRequests[serviceName] = requestQueue[serviceName] = false;

                        var requestHeaders = jqXHR.getResponseHeader('asx-redirect-url');

                        if (requestHeaders !== null && requestHeaders !== '') {
                            window.location.href = requestHeaders;
                            return;
                        }

                        if(options.ignoreResponseData){
                            if(typeof successCallback === "function"){
                                successCallback(response, options);
                            }
                            return;

                        }
                        //Show generic error message if response has "HTML or BODY" tag in response Object
                         if( argsObj.format === 'html' && response.indexOf('<body') !== -1 && response.indexOf('<html') !== -1) {
                            if(options.execDefaultErrorHandler === true  || typeof errorCallBack === "function") {
                                genericErrorHandler(errorCallBack, options);
                            }
                            return;
                         }


                        if (response !== "" && response != null) {
                            // close preloader
                            closePreloader(options);

                            //Show genric error message if response status is GENERIC_ERROR
                            if(ML.utils.hasProperty(response, "status") && typeof response.status === 'string' && response.status.toUpperCase() == "GENERIC_ERROR"){
                                if (argsObj.execDefaultErrorHandler === true || typeof errorCB === "function"){
                                    genericErrorHandler(errorCB, options);
                                }
                            }

                            if(options.loadTarget !== "" && argsObj.loadTarget[0]){
                                options.loadTarget.append(response);
                            }

                            if(typeof successCallback === "function"){
                                successCallback(response, options);
                            }
                        } else {
                            if (options.defaultErrorHandler === true || typeof errorCallBack === "function") {
                                closePreloader(options);
                                genericErrorHandler(errorCallBack, options);
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        ns.ajaxRequests[serviceName] = requestQueue[serviceName] = false;

                        if (options.defaultErrorHandler === true  || typeof errorCallBack === "function") {
                            genericErrorHandler(errorCallBack, options, error);
                        }
                    },
                    timeout: options.timeout
                }


                ns.ajaxRequests[serviceName] = requestQueue[serviceName] =  $.ajax(ajaxParams);

            } else{
                console.log("Service URL missing in parameters.")
            }
        }

        var closePreloader = function(options){
            var $preloaderTarget = $(options.preloaderTarget);
            if (options.preloader === true && $preloaderTarget[0]) {
                $preloaderTarget.removeClass("loading");
            }
        };

        var genericErrorHandler = function (callback, options, error) {
            if(typeof callback == "function"){
                callback(error, options);
            } else {
                // code to be written for showing generic errors
                // you can show either by any modal, or notification
            }
        };


        self.get = function (serviceName, options) {
            if(typeof serviceName === undefined || serviceName === "") {
                console.log("Be good and let us know the serviceName")
            }

            options = $.extend(true, {}, defaults, options);

            ajax(serviceName, options);
        };

        /**
         * Post a form, with data params
         * Service names are mandatory - this would make sure no duplicate call are made.
         * @param options
         */
        self.post = function (serviceName, options) {
            //make sure you have a service name
            if(typeof serviceName === undefined || serviceName === "") {
                console.log("Be good and let us know the serviceName");
                return;
            }
            //make sure you have data to be sent.
            if(options.data == null || options.data == {}){
                return;
            }

            options = $.extend(true, {}, defaultPostOptions, options);

            ajax(serviceName, options);
        }
    };

    ns.ajaxService = new AjaxService();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null, window.NameSpace || {}, window, window.document);
