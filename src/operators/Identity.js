'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class IdentityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) === this.resolveSide(rightSide, context);
  }

}

IdentityOperator.$pattern = /^===/;

module.exports = IdentityOperator;
