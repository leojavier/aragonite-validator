var aragonite = (function () {
    //'use strict';

    var me = this;
    var form = null;
    var elements = null;

    Regex = {
        // List of regex to validate fields
        alphaNumeric: /^[A-Z,a-z,0-9, -_]+$/,
        string: /^[A-Z,a-z ,.'-]+$/,
        email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phone: /^[0-9]{10,15}/,
        required: '',
        username: /^([a-zA-Z0-9_-]){6,20}/,
        password: /^([a-zA-Z0-9_!@#$%^&*-]){8,12}/
    };

    controller = {
        validate: function (opt) {

            if (!opt.value.match(Regex[opt.dataType])) {
                opt.field.setAttribute('class', 'required');
            } else {
                function hasClass(ele, cls) {
                    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
                }

                if (hasClass(opt.field, 'required')) {
                    var reg = new RegExp('(\\s|^)required(\\s|$)');
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

            var elements = me.elements;

            if (elements) {
                var group = elements.length;
            } else {
                this.elements = document.getElementsByTagName('input');
                var elements = this.elements;
                var group = elements.length;
            }

            for (var i = 0; i < group; i++) {

                me.controller.validate({
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
        }
    };
    /**
     * Initiate the validator
     * @param {string} [elementId] Takes the ID of the form without #
     * returns void
     */
    init = function (formId) {

        form = document.getElementById(formId);

        var fields = [];
        var searchFields = form.children;

        for (var i = 0; i < searchFields.length; i++) {
                fields.push(searchFields[i]);
        }

        var group = fields.length;


        var validate = function () {
            for (var i = 0; i < group; i++) {
                var events = ['keyup', 'blur']

                for (var e = 0; e < events.length; e++) {
                    if (fields[i].addEventListener) {
                        fields[i].addEventListener(events[e], function (e) {
                            var target;
                            if (e.target) {
                                target = e.target;
                            } else if (e.srcElement) {
                                target = e.srcElement;
                            }
                            me.controller.validate({
                                field: target,
                                value: target.value,
                                dataType: target.getAttribute('data-type'),
                                optional: target.getAttribute('data-optional')
                            });
                        });
                    } else if (fields[i].attachEvent) {
                        fields[i].attachEvent(events[e], function (e) {
                            var target;
                            if (e.target) {
                                target = e.target;
                            } else if (e.srcElement) {
                                target = e.srcElement;
                            }
                            me.controller.validate({
                                field: target,
                                value: target.value,
                                dataType: target.getAttribute('data-type'),
                                optional: target.getAttribute('data-optional')
                            });
                        });
                    }
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
                    me.controller.submit(form);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.addEventListener('submit', function (e) {
                e.preventDefault();
                me.controller.submit(form);

            });

        } else if (form.attachEvent) {
            form.attachEvent('keyup', function (e) {
                if (e.which === 32) {
                    return false;
                }
                else if (e.which === 13) {
                    me.controller.submit(form);
                } else if (e.which === 9) {
                    validate();
                }
            });

            form.attachEvent('submit', function (e) {
                e.preventDefault();
                me.controller.submit(form);

            });
        }

        


    };

    return {
        init: init
    }
})();