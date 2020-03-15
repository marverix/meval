'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class NonidentityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) !== this.resolveSide(rightSide, context);
  }

}

NonidentityOperator.$pattern = /^!==/;

module.exports = NonidentityOperator;
