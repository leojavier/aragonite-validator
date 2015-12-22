/*jslint node: true */
var aragonite = (function () {
    //'use strict';
    var form = null;

    var Regex = {
        // List of regex to validate fields
        alphaNumeric: {
            value: /^[A-Z,a-z,0-9, -_]+$/,
            message: 'This alphanumeric string is invalid'
        },
        string: {
            value: /^[A-Z,a-z ,.'-]+$/,
            message: 'This string is invalid'
        },
        email: {
            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'This is not a valid email address'
        },
        phone: {
            value: /^[0-9]{10,15}/,
            message: 'Wrong phone number format'
        },
        required: '',
        //All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
        visa: {
            value: /^4[0-9]{12}(?:[0-9]{3})?$/,
            message: 'This credit card number is invalid'
        },
        //All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
        masterCard: {
            value: /^5[1-5][0-9]{14}$/,
            message: 'This credit card number is invalid'
        },
        //American Express card numbers start with 34 or 37 and have 15 digits.
        amex: {
            value: /^3[47][0-9]{13}$/,
            message: 'This credit card number is invalid'
        },
        //Discover card numbers begin with 6011 or 65. All have 16 digits.
        discover: {
            value: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
            message: 'This credit card number is invalid'
        },
        //Credit cards security code. from 3 to 4 digits
        cvv: {
            value: /^[0-9]{3,4}$/,
            message: 'This securit code is invalid'
        }
    };

    var controller = {
        validate: function (opt) {
            var reg = new RegExp('(\\s|^)' + opt.className + '(\\s|$)');
            var classHolder = opt.field.className;

            if (!opt.value.match(Regex[opt.dataType].value)) {
                if (classHolder.indexOf(opt.className) < 0) {
                    opt.field.setAttribute('class', classHolder + ' ' + opt.className);
                    controller.getLabel(opt.field.getAttribute('name'), Regex[opt.dataType].message);

                }

            } else {
                controller.getLabel(opt.field.getAttribute('name'), '');

                var hasClass = function (ele, cls) {
                    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
                };

                if (hasClass(opt.field, opt.className)) {
                    opt.field.className = classHolder.replace(reg, '');
                }
            }
            if (opt.optional) {
                if (opt.value.length > 0) {
                    opt.field.className = classHolder.replace(reg, '');
                }
            }
        },
        submit: function (e, opt) {

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
                    parent: elements[i].parentElement,
                    value: elements[i].value,
                    dataType: elements[i].getAttribute('data-type'),
                    optional: elements[i].getAttribute('data-optional')
                });

            }

            if (document.getElementsByClassName(opt.className).length) {
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
                var item = options[i].regex.value.toString(),
                    firstChar = item.substr(0, 1),
                    lastChar = item.substr(item.length - 1, item.length);

                if (typeof (options[i].regex) === "object" && firstChar === "/" && lastChar === "/") {
                    Regex[options[i].name] = {
                        value: options[i].regex.value,
                        message: options[i].regex.message
                    };
                }
            }
        },

        /**
         * Will atach an event handler to an element
         * @param {HTML element} [element] takes the element and assign an event handler
         * returns void
         */
        bind: function (element, event, className) {
            if (element.addEventListener) {
                element.addEventListener(event, function (e) {
                    var target;
                    var parent;

                    if (e.target) {
                        target = e.target;
                        parent = e.target.parentElement;
                    } else if (e.srcElement) {
                        target = e.srcElement;
                        parent = e.srcElement.parentElement;
                    }
                    controller.validate({
                        field: target,
                        parent: parent,
                        className: className,
                        value: target.value,
                        dataType: target.getAttribute('data-type'),
                        optional: target.getAttribute('data-optional')
                    });
                });
            }
            else if (element.attachEvent) {
                element.attachEvent(event, function (e) {
                    var target;
                    if (e.target) {
                        target = e.target;
                    } else if (e.srcElement) {
                        target = e.srcElement;
                    }
                    controller.validate({
                        field: target,
                        parent: e.parentElement,
                        className: className,
                        value: target.value,
                        dataType: target.getAttribute('data-type'),
                        optional: target.getAttribute('data-optional')
                    });
                });
            }
        },

        getLabel: function (label, message) {
            var labels = document.getElementsByTagName('label');
            for (var i = 0; i < labels.length; i++) {
                if (labels[i].htmlFor === label + '-error')
                    labels[i].innerHTML = message;
            }
        }
    };

    /**
     * Initiate the validator
     * @param {string} [elementId] Takes the ID of the form without #
     * returns void
     */
    var init = function (formId, opt) {

        var className = null;
        var messages = null;

        if (opt && opt.regex) { controller.getRegex(opt.regex); }
        opt && opt.className ? className = opt.className : className = "required";
        opt && opt.messages ? messages = opt.messages : messages = false;

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
                    controller.bind(fields[i], events[e], className, messages);
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
                    controller.submit(form, opt);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                controller.submit(form, opt);

            });

        } else if (form.attachEvent) {
            form.attachEvent('keyup', function (e) {
                if (e.which === 32) {
                    return false;
                }
                else if (e.which === 13) {
                    controller.submit(form, opt);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.attachEvent('submit', function (e) {
                e.preventDefault();
                controller.submit(form, opt);

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