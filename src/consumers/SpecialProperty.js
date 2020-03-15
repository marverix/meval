'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class SpecialPropertyConsumer extends AbstractConsumer {

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
    case 'undefined':
      return undefined;

    case 'null':
      return null;

    case 'NaN':
      return NaN;

    case 'Infinity':
      return Infinity;

    default:
      throw new Error('Unexpected end of the property');
    }
  }

}

SpecialPropertyConsumer.$pattern = /^(?:undefined|null|NaN|Infinity)/;

module.exports = SpecialPropertyConsumer;
