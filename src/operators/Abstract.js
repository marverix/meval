/* eslint-disable no-unused-vars */
'use strict';

const AbstractEntity = require('../common/AbstractEntity');
const AbstractConsumer = require('../consumers/Abstract');
const TakeResponseEnum = require('../common/TakeResponseEnum');

class AbstractOperator extends AbstractEntity {

  constructor () {
    super();
  }

  get $priority () {
    return this.constructor.$priority;
  }

  take (char) {
    if (this.$pattern == null) {
      throw new Error('Incorrect operator');
    }

    this.add(char);

    if (this.$pattern.test(this.data)) {
      return TakeResponseEnum.OK_CONTENTED;
    } else {
      return TakeResponseEnum.OK;
    }
  }

  execute (context, myIndex, entities) {
    throw new Error('Overwrite this method!');
  }

  resolveSide (side, context) {
    return side instanceof AbstractConsumer ? side.resolve(context) : side;
  }

}

module.exports = AbstractOperator;
