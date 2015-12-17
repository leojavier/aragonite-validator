# Aragonite-validator

[![npm version](https://badge.fury.io/js/aragonite-form-validator.svg)](https://badge.fury.io/js/aragonite-form-validator)
[![David](https://david-dm.org/leojavier/aragonite-validator.svg)]()
[![Build Status](https://travis-ci.org/leojavier/aragonite-validator.svg?branch=master)](https://travis-ci.org/leojavier/aragonite-validator)
[![DUB](https://img.shields.io/dub/l/vibe-d.svg)](https://opensource.org/licenses/MIT)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/leojavier/aragonite-validator/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

### What is Aragonite?
Is a lightweight and onobstrusive field validator that helps you validate any kind of 
data before submiting to your server.
___
### Table of Contents
- [1. Getting Started](#1getting-Started)
- [2. Load the plugin in your page ](#load-the-plugin-in-your-page)
- [3. Initialize the plugin ](#initialize-the-plugin)
- [4. Options ](#data-type-Options)
- [5. License agreement ](#license-mit)
- [6. ChangeLog](https://github.com/leojavier/aragonite-validator/tree/master/changeLog)

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
</head>
<body>
    <h1>Sample page</h1>
    <form id="demo-form" class="how-form" action="#">
            <input type="text" data-type="email" placeholder="Type an Email address" />
        <input type="text" data-type="string" placeholder="Type any string" />
        <input type="text" data-type="phone" placeholder="Type a phone number" />
    </form>
    <script src="aragonite-form-validator/aragonite.js"></script>
</body>
</html>
```
>Note: *The form must have an `ID` attribute, in this case `demo-form`*. In every field you must specify what kind of `data-type` you need to validate

### Initialize the plugin

```javascript
<script type="text/javascript">
    aragonite.init('demo-form');
</script>
```

>Note: *You need to pass the `ID` of your form. In this case `demo-form`*.

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
