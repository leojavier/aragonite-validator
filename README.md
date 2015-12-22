# Aragonite-validator

<a href="https://zenhub.io"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/leojavier/aragonite-validator/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![npm version](https://badge.fury.io/js/aragonite-form-validator.svg)](https://badge.fury.io/js/aragonite-form-validator)
[![David](https://david-dm.org/leojavier/aragonite-validator.svg)]()
[![Build Status](https://travis-ci.org/leojavier/aragonite-validator.svg?branch=master)](https://travis-ci.org/leojavier/aragonite-validator)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT)


### What is Aragonite?
Is a lightweight and onobstrusive field validator that helps you validate any kind of 
data before submiting to your server.
___

### Table of Contents
- [1. Getting Started](#getting-started)
- [2. Load the plugin in your page ](#load-the-plugin-in-your-page)
- [3. Initialize the plugin ](#initialize-the-plugin)
- [4. Customizations](#customizations)
    * [4.1. Adding a custom CSS className](#adding-a-custom-classname)
    * [4.2. Adding custom Validation](#adding-custom-validation)
    * [4.3.  Adding custom error messages](#adding-custom-error-messages)
- [5. Data Type Options ](#data-type-options)
- [6. License agreement ](#license-mit)
- [7. ChangeLog](https://github.com/leojavier/aragonite-validator/tree/master/changeLog)

### Getting Started
**Npm:** `npm install aragonite-form-validator`

**Bower:** `bower install aragonite-form-validator`

### Load the plugin in your page 

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    
    <!-- Loading the file aragonite-style-base.css is optional The the only functionality of this 
    file is to add some CSS properties to the [.required] className that Aragonite will add to the 
    HTML field when something data is not valid
    -->
    <link rel="stylesheet" type="text/css" href="dist/css/aragonite-style-base.css">

</head>
<body>
    <h1>Sample page</h1>
    <form id="demo-form" class="how-form" action="#">
            <input type="text" data-type="email" placeholder="Type an Email address" />
        <input type="text" data-type="string" placeholder="Type any string" />
        <input type="text" data-type="phone" placeholder="Type a phone number" />
    </form>
    <script src="dist/js/aragonite.min.js"></script>
</body>
</html>
```
>Note: *The form must have an `ID` attribute, in this case `demo-form`*. In every field you must specify what kind of **`data-type`** you need to validate

### Initialize the plugin

```javascript
<script type="text/javascript">
    aragonite.init('demo-form');
</script>
```
---
### Customizations

##### Adding a custom className
By default Aragonite will add a class attribute to your HTML field when something is wrong. This className is call
'required'. However... you might have another `CSS` class already using that name in your project. If that's the case... you can always overwrite Aragonite's default behavior and pass a custom class name.

```javascript
//className
<script type="text/javascript">
    aragonite.init('demo-form', {
        className: 'myCustomClass'
    });
</script>
```
>Note: *In thi example when the field is invalid, it will add the CSS Class `myCustomClass`  to the HTML element instead of 'required'*

___

##### Adding custom validation
Below you will find a set of options that you can use to validate your forms. I will be adding more options "every week".
In case you need to use a custom validation you can always pass it as an argument and then use it on your form.

```
 <form id="demo-form" class="how-form" action="#">
    <input type="text" data-type="capital" placeholder="Type any string" />
    <input type="text" data-type="seven" placeholder="Type a phone number" />
</form>
```
```javascript
<script type="text/javascript">
    aragonite.init('demo-form', {
    regex: [
        { name: 'capital', regex: /^[A-Z][a-z0-9_-]{3,19}$/ }, //Will be valid only if the first character is UPPERCASE
        { name: 'seven', regex: /^[a-zA-Z]{7}$/ }  // Will be valid only if the length of the string is 7 characters
    ]
    });
</script>
```

>Note: You pass the property `name` of these regex through your `data-type` attribute and Aragonite will do the rest for you. You can pass as many regex as you want*.

___

##### Adding custom error messages
Aragonite wire the error messages automatically for you. You just need to create a **`label`** element and set the `for` attribute of the label to the `inputName-error`. The following example shows you how to wire a simple Email input field.

```html
<label for="email-error"></label>
<input type="text" name="email" value="" data-type="email" placeholder="Type an Email address" />
```
>Note: You pass the property `name` of the targeted field in this case `email` an then the `error` keyword separated by a dash. `email-error`*.


```html
<form id="demo-form-custom-labels" class="how-form" action="#">
   <label for="email">E-mail</label>
   <label for="email-error" class="aragonite-error-message"></label>
   <input type="text" name="email" value="" data-type="email" placeholder="Type an Email address" />
   <label for="string">First name</label>
   <label for="string-error" class="aragonite-error-message"></label>
   <input type="text" name="string" value="" data-type="string" placeholder="Type any string" />
   <label for="phone">Phone number</label>
   <label for="phone-error" class="aragonite-error-message"></label>
   <input type="text" name="phone" value="" data-type="phone" placeholder="Type a phone number" />
</form>
```

```javascript
<script type="text/javascript">
aragonite.init('demo-form-custom-labels');
</script>
```

>Note: You pass the property `name` of these regex through your `data-type` attribute and Aragonite will do the rest for you. You can pass as many regex as you want*.

___

### Data type Options

Option  | Behavior
------------- | -------------
`string` | Validate if the content submited by the user is a string. It doesn't accept numbers or special characters.
`alphaNumeric`  | This option will accept letters, numbers , - and _.
`phone`  | This option accept only numbers, not special characters. A minimum of 10 characters and a maximum of 15.
`visa`  | All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.
`mastercard`  | All MasterCard numbers start with the numbers 51 through 55. All have 16 digits.
`amex`  | American Express card numbers start with 34 or 37 and have 15 digits.
`discover`  | Discover card numbers begin with 6011 or 65. All have 16 digits.
`cvv`  | Credit cards security code. from 3 to 4 digits(Amex)

### License MIT
The MIT License (MIT)
Copyright (c) 2015 [Leo Javier]()

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
