/* eslint-disable no-unused-vars */
'use strict';

const AbstractEntity = require('../common/AbstractEntity');

class AbstractConsumer extends AbstractEntity {

  constructor () {
    super();
  }

  get last () {
    return this.data[this.data.length - 1];
  }

  resolve (context) {
    // Overwrite this method
    return this.data;
  }

}

module.exports = AbstractConsumer;
