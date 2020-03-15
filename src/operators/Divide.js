'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class DivideOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) / this.resolveSide(rightSide, context);
  }

}

DivideOperator.$pattern = /^\//;

module.exports = DivideOperator;
