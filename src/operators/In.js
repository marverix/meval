'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class InOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) in this.resolveSide(rightSide, context);
  }

}

InOperator.$pattern = /^in/;

module.exports = InOperator;
