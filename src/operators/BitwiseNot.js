'use strict';

const Abstract1ArgOperator = require('./Abstract1Arg');

class BitwiseNotOperator extends Abstract1ArgOperator {

  constructor () {
    super();
  }

  _executeForOperator (rightSide) {
    if (rightSide instanceof BitwiseNotOperator) {
      return null;
    } else {
      throw new Error('Invalid usage of bitwise not');
    }
  }

  _executeForConsumer (rightSide, context) {
    return ~ this.resolveSide(rightSide, context);
  }

}

BitwiseNotOperator.$pattern = /^~/;

module.exports = BitwiseNotOperator;
