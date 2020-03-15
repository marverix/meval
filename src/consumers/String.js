'use strict';

const AbstractConsumer = require('./Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class StringConsumer extends AbstractConsumer {

  constructor () {
    super();
    this.delimiter = null;
    this.escape = false;
  }

  take (char) {
    if (this.delimiter == null) {
      this.delimiter = char;
      return TakeResponseEnum.OK;
    } else if (char === this.delimiter) {
      if (this.escape) {
        this.add(this.delimiter);
        this.escape = false;
        return TakeResponseEnum.OK;
      } else {
        this.delimiter = null;
        return TakeResponseEnum.OK_CONTENTED;
      }
    } else if (!this.escape && char === '\\') {
      this.escape = true;
      return TakeResponseEnum.OK;
    } else {
      if (this.escape) {
        this.add('\\');
        this.escape = false;
      }
      this.add(char);
      return TakeResponseEnum.OK;
    }
  }

  resolve () {
    if (this.delimiter != null) {
      throw new Error('Unexpected end of the string!');
    }

    return this.data;
  }

}

StringConsumer.$pattern = /^['"`]/;

module.exports = StringConsumer;
