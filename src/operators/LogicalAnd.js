'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class LogicalAndOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    let leftSideResolved = this.resolveSide(leftSide, context);
    if (!leftSideResolved) {
      return false;
    } else {
      return this.resolveSide(rightSide, context);
    }
  }

}

LogicalAndOperator.$pattern = /^&&/;

module.exports = LogicalAndOperator;
