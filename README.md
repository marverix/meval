# meval - m(imic) eval

[![Build Status](https://img.shields.io/travis/com/marverix/meval/master.svg)](https://travis-ci.com/marverix/meval)
[![Current Release](https://img.shields.io/github/release/marverix/meval.svg)](releases)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

## Info

This is **not** a "safe JavaScript eval". This library only mimics `eval()` functionality to some point.
It always returns the value of given expression. You always need to provide context in which it will be executed (context **must be** an Object).

Pure JavaScript! No dependencies! ^^,

### What's working

* one-argument operators:
  * `! ...`
  * `~ ...`
  * `+ ...`
  * `- ...`
  * `typeof ...`
* two-argument operators:
  * `... . ...` (member accessor)
  * `... * ...`
  * `... / ...`
  * `... % ...`
  * `... + ...`
  * `... - ...`
  * `... >= ...`
  * `... <= ...`
  * `... > ...`
  * `... < ...`
  * `... instanceof ...`
  * `... in ...`
  * `... === ...`
  * `... !== ...`
  * `... == ...`
  * `... != ...`
  * `... && ...`
  * `... || ...`
  * `... & ...`
  * `... | ...`
  * `... ^ ...`
* three-argument operator:
  * `... ? ... : ...`
* Strings, Numbers (both Integers and Floats) and Booleans
  * Node: Interpolation in Strings is not planned for now to be implemented
* properties:
  * `undefined`
  * `null`
  * `NaN`
  * `Infinity`
* grouping (paranthesis)
* calling methods
  * support nested methods (e.g. `foo(1, bar(item.a, item.b))`)
* mixing above

### TODO

* one-argument operators:
  * `new` (I don't know if it's good idea?)
* accessing allowed global Objects such as `Date`, `Math`, `Number`, `String`, `Array` and `Object`

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
