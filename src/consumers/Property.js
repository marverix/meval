'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

const innerPattern = /^[$_A-Za-z0-9]/;

class PropertyConsumer extends AbstractConsumer {

  constructor () {
    super();
  }

  take (char) {
    if (innerPattern.test(char)) {
      this.add(char);
      return TakeResponseEnum.OK;
    }
    return TakeResponseEnum.REJECT;
  }

  resolve (context) {
    return context ? context[this.data] : this.data;
  }

}

PropertyConsumer.$pattern = /^[$_A-Za-z]/;

module.exports = PropertyConsumer;
