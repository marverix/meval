/* eslint-disable no-unused-vars */
'use strict';

class AbstractEntity {

  constructor () {
    this.data = '';
  }

  get $pattern () {
    return this.constructor.$pattern;
  }

  add (char) {
    this.data += char;
  }

  take (char) {
    throw new Error('Overwrite this method!');
  }

}

module.exports = AbstractEntity;
