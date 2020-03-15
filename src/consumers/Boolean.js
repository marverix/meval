'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class BooleanConsumer extends AbstractConsumer {

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
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      throw new Error('Unexpected end of the boolean');
    }
  }

}

BooleanConsumer.$pattern = /^(?:true|false)/;

module.exports = BooleanConsumer;
