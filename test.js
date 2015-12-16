var aragonite = require('./aragonite.js');
var test = require('tape');

/**
* Add custom regular expression to the Regex object
* @param {obj} [option] Takes an object with two properties. The name of the field and the regular expression to use for validation
* returns void
*/

test('Should validate regular expressiions', function (assert) {
    assert.equal(aragonite.regex.cvv.test(654), true, "Testing CVV: Should be true");
    assert.equal(aragonite.regex.cvv.test(64), false, "Testing CVV: Should be false");
    assert.equal(aragonite.regex.cvv.test('@~_'), false, "Testing CVV: Should be false");
    assert.equal(aragonite.regex.cvv.test(6445), true, "Testing CVV: Should be true");
    assert.equal(aragonite.regex.cvv.test(65478), false, "Testing CVV: Should be false");
    assert.equal(aragonite.regex.cvv.test('asdasd'), false, "Testing CVV: Should be false");
    
    //Testing string regex
    assert.equal(aragonite.regex.string.test(654), false, "Testing STRING: Should be false");
    assert.equal(aragonite.regex.string.test('this is a text'), true, "Testing STRING: Should be true");
    assert.equal(aragonite.regex.string.test("this, is. a-text sample's"), true, "Testing STRING: Should be true");
    assert.equal(aragonite.regex.string.test('another test %$^'), false, "Testing STRING: Should be false");

    assert.end();
});