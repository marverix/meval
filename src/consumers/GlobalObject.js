'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class GlobalObjectConsumer extends AbstractConsumer {

  constructor () {
    super();
  }

  take (char) {
    this.add(char);

    if (this.$pattern.test(this.data)) {
      return TakeResponseEnum.OK_CONTENTED;
    } else {
      return TakeResponseEnum.OK;
    }
  }

  resolve () {
    switch (this.data) {
    case 'Date':
      return Date;

    case 'Math':
      return Math;

    case 'Number':
      return Number;

    case 'String':
      return String;

    case 'Array':
      return Array;

    case 'Object':
      return Object;

    default:
      throw new Error('Unexpected end of the global object');
    }
  }

}

GlobalObjectConsumer.$pattern = /^(?:Date|Math|Number|String|Array|Object)/;

module.exports = GlobalObjectConsumer;
