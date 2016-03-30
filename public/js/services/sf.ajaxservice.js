/**
 *   services.js
 *
 *   @project    < write project name here >
 *   @date       < put date here >
 *   @author     < author name >
 *   @site       < site name >
 */
(function($, sf, window, document, undefined) {

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
                preLoaderTarget:null,
                allowMultiple:false,
                loadTarget:""
            },
            defaultPostOptions = $.extend(true,{} ,defaults , {
                type:"POST"
            });

        var ajax = function(serviceName, options){

            var serviceURL = options.url,
                ajaxParams,
                successCallback= options.success,
                errorCallBack = options.error;

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
                        404: function(){
                            //track down what needs to be done
                        },
                        302: function(){
                            // this is good for what?
                        }
                    },
                    beforeSend: function (jqXHR, settings) {
                        if (options.preLoader === true && $(options.preLoaderTarget)[0]) {
                            $(options.preLoaderTarget).addClass("loading");
                        }
                        if (typeof options.beforeSend === "function") {
                            options.beforeSend(jqXHR, settings);
                        }
                    },
                    success: function (response, textStatus, jqXHR) {

                        requestQueue[serviceName] = false;

                        var requestHeaders = jqXHR.getResponseHeader('redirect-url');

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
                         if( options.format === 'html' && response.indexOf('<body') !== -1 && response.indexOf('<html') !== -1) {
                            if(options.execDefaultErrorHandler === true  || typeof errorCallBack === "function") {
                                genericErrorHandler(errorCallBack, options);
                            }
                            return;
                         }


                        if (response !== "" && response != null) {
                            // close preloader
                            closePreloader(options);

                            //Show genric error message if response status is GENERIC_ERROR
                            if(hasProperty(response, "status") && typeof response.status === 'string' && response.status.toUpperCase() == "GENERIC_ERROR"){
                                if (options.execDefaultErrorHandler === true || typeof errorCB === "function"){
                                    genericErrorHandler(errorCB, options);
                                }
                            }

                            if(options.loadTarget !== "" && options.loadTarget[0]){
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
                        requestQueue[serviceName] = false;

                        if (options.defaultErrorHandler === true  || typeof errorCallBack === "function") {
                            genericErrorHandler(errorCallBack, options, error, serviceName);
                        }

                    },
                    timeout: options.timeout
                };

                requestQueue[serviceName] =  $.ajax(ajaxParams);


            } else{
                console.log("Service URL missing in parameters.")
            }
        };

        var hasProperty = function(obj, key) {
            return Object.prototype.hasOwnProperty.call(obj, key);
        };

        var closePreloader = function(options){
            var $preLoaderTarget = $(options.preLoaderTarget);
            if (options.preLoader === true && $preLoaderTarget[0]) {
                $preLoaderTarget.removeClass("loading");
            }
        };

        var genericErrorHandler = function (callback, options, error, serviceName) {
            if(typeof callback == "function"){
                callback(error, options);
            } else {
               console.error("Ajax call " +serviceName +  " failed because of response contains :"+  error);
            }
        };

        self.get = function (serviceName, options) {
            if(typeof serviceName === undefined || serviceName === "") {
                console.log("Be good and let us know the serviceName")
            }

            options = $.extend(true, {}, defaults, options);
            ajax(serviceName, options);
            return serviceName;
        };

        /**
         * Post a form, with data params
         * Service names are mandatory - this would make sure no duplicate call are made.
         * @param serviceName
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

            return serviceName;
        }
    };

    sf.ajaxService = new AjaxService();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null, SF, window, window.document);
