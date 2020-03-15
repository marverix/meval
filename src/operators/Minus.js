'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class MinusOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) - this.resolveSide(rightSide, context);
  }

}

MinusOperator.$pattern = /^-/;

module.exports = MinusOperator;
