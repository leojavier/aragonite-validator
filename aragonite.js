/*jslint node: true */
var aragonite = (function () {
    //'use strict';
    var form = null;

    var Regex = {
        // List of regex to validate fields
        alphaNumeric: /^[A-Z,a-z,0-9, -_]+$/,
        string: /^[A-Z,a-z ,.'-]+$/,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[0-9]{10,15}/,
        required: '',
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,//All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
        masterCard: /^5[1-5][0-9]{14}$/,//All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
        amex: /^3[47][0-9]{13}$/,//American Express card numbers start with 34 or 37 and have 15 digits.
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,//Discover card numbers begin with 6011 or 65. All have 16 digits.
        cvv: /^[0-9]{3,4}$///Credit cards security code. from 3 to 4 digits
    };

    var controller = {
        validate: function (opt) {
            var reg = new RegExp('(\\s|^)required(\\s|$)');

            if (!opt.value.match(Regex[opt.dataType])) {
                opt.field.setAttribute('class', 'required');
            } else {
                var hasClass = function (ele, cls) {
                    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
                };

                if (hasClass(opt.field, 'required')) {

                    opt.field.className = opt.field.className.replace(reg, ' ');
                }
            }
            if (opt.optional) {
                if (opt.value.length > 0) {
                    opt.field.className = opt.field.className.replace(reg, ' ');
                }
            }

        },
        submit: function (e) {

            var group,
                elements;

            if (elements) {
                group = elements.length;
            } else {
                this.elements = document.getElementsByTagName('input');
                elements = this.elements;
                group = elements.length;
            }

            for (var i = 0; i < group; i++) {

                controller.validate({
                    field: elements[i],
                    value: elements[i].value,
                    dataType: elements[i].getAttribute('data-type'),
                    optional: elements[i].getAttribute('data-optional')
                });

            }

            if (document.getElementsByClassName('required').length) {
                return false;
            }
            else {
                e.submit(this.form);
            }
        },

        /**
         * Add custom regular expression to the Regex object
         * @param {obj} [option] Takes an object with two properties. The name of the field and the regular expression to use for validation
         * returns void
         */
        getRegex: function (opt) {
            var options = opt,
                optionsQty = options.length;

            for (var i = 0; i < optionsQty; i++) {
                var item = options[i].regex.toString(),
                    firstChar = item.substr(0, 1),
                    lastChar = item.substr(item.length - 1, item.length);

                if (typeof (options[i].regex) === "object" && firstChar === "/" && lastChar === "/") {
                    Regex[options[i].name] = options[i].regex;
                }
            }
        },

        /**
         * Will atach an event handler to an element
         * @param {HTML element} [element] takes the element and assign an event handler
         * returns void
         */
        bind: function (element, event) {
            if (element.addEventListener) {
                element.addEventListener(event, function (e) {
                    var target;
                    if (e.target) {
                        target = e.target;
                    } else if (e.srcElement) {
                        target = e.srcElement;
                    }
                    controller.validate({
                        field: target,
                        value: target.value,
                        dataType: target.getAttribute('data-type'),
                        optional: target.getAttribute('data-optional')
                    });
                });
            } else if (element.attachEvent) {
                element.attachEvent(event, function (e) {
                    var target;
                    if (e.target) {
                        target = e.target;
                    } else if (e.srcElement) {
                        target = e.srcElement;
                    }
                    controller.validate({
                        field: target,
                        value: target.value,
                        dataType: target.getAttribute('data-type'),
                        optional: target.getAttribute('data-optional')
                    });
                });
            }
        }
    };

    /**
     * Initiate the validator
     * @param {string} [elementId] Takes the ID of the form without #
     * returns void
     */
    var init = function (formId, opt) {

        if (opt.regex) {
            controller.getRegex(opt.regex);
        }

        form = document.getElementById(formId);

        var fields = [];
        var searchFields = form.children;

        for (var i = 0; i < searchFields.length; i++) {
            fields.push(searchFields[i]);
        }

        var group = fields.length;

        var validate = function () {
            for (var i = 0; i < group; i++) {
                var events = ['keyup', 'blur'];

                for (var e = 0; e < events.length; e++) {
                    controller.bind(fields[i], events[e]);
                }

            }
        };

        validate();
        if (form.addEventListener) {
            form.addEventListener('keyup', function (e) {
                if (e.which === 32) {
                    return false;
                }
                else if (e.which === 13) {
                    controller.submit(form);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                controller.submit(form);

            });

        } else if (form.attachEvent) {
            form.attachEvent('keyup', function (e) {
                if (e.which === 32) {
                    return false;
                }
                else if (e.which === 13) {
                    controller.submit(form);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.attachEvent('submit', function (e) {
                e.preventDefault();
                controller.submit(form);

            });
        }
    };
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        return {
            init: init,
            regex: Regex
        };
    } else {
        return {
            init: init
        };
    }
})();
 
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = aragonite;
}
else {
    window.aragonite = aragonite;
}