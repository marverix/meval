# meval - m(imic) eval

[![Build Status](https://img.shields.io/travis/com/marverix/meval/master.svg)](https://travis-ci.com/marverix/meval)
[![Current Release](https://img.shields.io/github/release/marverix/meval.svg)](releases)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## Info

This is *not* a "safe JavaScript eval". This is small library that only mimics `eval()` functionality to some point.
It always returns the value of given expression. You always need to provide context in which it will be executed 
(context *must be* an Object).

### What's working

* simple one-line expressions
* single argument operator: `!`, `typeof`
* all two argument operators: `*`, `/`, `%`, `+`, `-`, `>=`, `<=`, `>`, `<`, `===`, `!==`, `==`, `!=`, `&&` and `||`
* three argument operator: `?:`
* Strings, Numbers (both Integers and Floats) and Booleans
* global properties: `undefined`, `null`, `NaN` and `Infinity`
* using `.` accessor
* calling methods
* accessing allowed global Objects such as `Date`, `Math`, `Number`, `String`, `Array` and `Object`
* paranthesis
* simple mixing above

### TODO

* support single argument operators: `new`, `-`, `+`
* support `[]` accessor
* support nested methods (e.g. `Math.min(1, Math.max(item.a, item.b))`)
* maybe validating proper JS syntax?

## Usage

```js
/**
 * @param {String} expression Expression to be parsed
 * @param {Object} context Context for expression
 */
meval(expression, context)
```

### Example

```js
<< meval('item.a + item.b * 5', { item: { a: 2, b: 3 } })
>> 17
```

## Authors

* **Marek Sierociński** - [marverix](https://github.com/marverix)

See also the list of [contributors](https://github.com/marverix/meval/contributors)
who participated in this project.

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
