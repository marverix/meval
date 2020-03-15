'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class NumberConsumer extends AbstractConsumer {

  constructor () {
    super();
    this.hasDot = false;
  }

  take (char) {
    if (this.$pattern.test(char)) {
      this.add(char);
    } else if (char === '.' && !this.hasDot) {
      this.add(char);
      this.hasDot = true;
    } else  {
      return TakeResponseEnum.REJECT;
    }
    return TakeResponseEnum.OK;
  }

  resolve () {
    if (this.last === '.') {
      throw new Error('Unexpected end of the float number!');
    }

    return this.hasDot ? parseFloat(this.data) : parseInt(this.data, 10);
  }

}

NumberConsumer.$pattern = /^\d/;

module.exports = NumberConsumer;
