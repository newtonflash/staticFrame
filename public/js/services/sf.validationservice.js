/**
 *   common validation utility
 *   Dependencies : SF.ajaxService, jQuery
 *
 *   @project    < your project name >
 *   @date       < dd/mm/yyy >
 *   @author     < your name >
 */

;(function($, ns, window, document, undefined) {

    "use strict";

    ns.validation = $.extend(true, {}, ns.validation || {}, {
        errorPlacement: function(error, element) {
            $(element).closest(".form-item").append(error);
        },
        onfocusout: function (element) {
            if($(element).val() && $(element).val().length > 0){
                $(element).valid();
            }
        },
        highlight: function(element) {
            $(element).addClass('error');
            $(element).closest(".form-item").addClass('error-block');
        },
        unhighlight: function(element) {
            $(element).removeClass('error');
            $(element).closest('.form-item').removeClass('error-block');
        }
    });

    var ValidationService = function() {
        var self = this,
            defaults = {
                form:               null,
                ajax:               false,
                ajaxSettings:       {},
                customAjaxData:     null,
                customAjaxHandler:  null,
                onSubmitClick:      null,
                onBeforeSubmit:     null,
                validationSettings: {},
                triggerSubmit:      false
            },
            defaultValidationSettings = {
                onkeyup:        false,
                onfocusout:     ns.validation.onfocusout,
                highlight:      ns.validation.highlight,
                unhighlight:    ns.validation.unhighlight,
                rules:          ns.validation.rules,
                messages:       ns.validation.messages,
                errorPlacement: ns.validation.errorPlacement,
                success:        ns.validation.success,
                ignore:         ".ignore",
                submitHandler:  function(form) {
                    var formData = $(form).data("formData");

                    if(typeof formData.onBeforeSubmit === 'function') formData.onBeforeSubmit();
                    if(typeof formData.onSubmitClick === 'function')  formData.onSubmitClick();

                    if(formData.ajax){
                        // handle the ajax by custom function
                        if( formData.customAjaxHandler !== null ){
                            formData.customAjaxHandler(formData.form);
                            return;
                        }
                        var $form = $(form),
                            ajaxName = $form.attr("id") || $form.attr("name");

                        formData.ajaxSettings.url = $form.attr("action") || $form.attr("data-ajax-url");
                        formData.ajaxSettings.data = (formData.customAjaxData !== null)? formData.customAjaxData : $form.serialize();

                        ns.ajaxService.post( ajaxName, formData.ajaxSettings);

                    } else {
                        // default submit, it would refresh the page.
                        form.submit();
                    }
                }
            };
        var submit = function(options){
            if (typeof options === "undefined") {
                return console.error("You need to provide options for form submission");
            } else if (typeof options.form === null || !$(options.form)[0]) {
                return console.error(options.form , " is null or does not exist in the page");
            }

            var formData = $.extend(true, {}, defaults, options),
                settings = $.extend(true, {}, defaultValidationSettings, options.validationSettings || {}),
                $form = $(formData.form);

            // keep the data on form as formData attribute and validate
            $form.data("formData", formData).validate(settings);
            if(formData.triggerSubmit){
                $(formData.form).trigger("submit");
            }
        };

        return {
            submit: submit,
            reset: function(formId){
                if(typeof formId === "undefined") return;
                document.getElementById(formId).reset();
            }
        };
    };

    ns.validationService = new ValidationService();

})((typeof window.jQuery !== "undefined") ? window.jQuery : null, window.ASX || {}, window, window.document);