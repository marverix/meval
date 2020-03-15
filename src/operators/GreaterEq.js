'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class GreaterEqOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) >= this.resolveSide(rightSide, context);
  }

}

GreaterEqOperator.$pattern = /^>=/;

module.exports = GreaterEqOperator;
