'use strict';

const AbstractOperator = require('./Abstract');

const err = 'Invalid usage of three-argument operator';

class ConditionalStartOperator extends AbstractOperator {

  constructor () {
    super();
  }

  execute (context, myIndex, entities) {
    let prevIndex = myIndex - 1;
    let endOpIndex = myIndex + 2;

    if (!(entities[endOpIndex] instanceof ConditionalEndOperator)) {
      throw new Error(err);
    }

    let result = this.resolveSide(entities[prevIndex], context) ?
      this.resolveSide(entities[myIndex + 1], context) :
      this.resolveSide(entities[myIndex + 3], context);

    entities.splice(prevIndex, 5, result);
  }

}

ConditionalStartOperator.$prevMustBeConsumer = true;
ConditionalStartOperator.$pattern = /^\?/;


class ConditionalEndOperator extends AbstractOperator {

  constructor () {
    super();
  }

  execute () {
    throw new Error(err);
  }

}

ConditionalEndOperator.$prevMustBeConsumer = true;
ConditionalEndOperator.$pattern = /^:/;


module.exports = {
  Start: ConditionalStartOperator,
  End: ConditionalEndOperator
};
