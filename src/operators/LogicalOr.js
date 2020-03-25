'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class LogicalOrOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    let leftSideResolved = this.resolveSide(leftSide, context);
    if (leftSideResolved) {
      return true;
    } else {
      return this.resolveSide(rightSide, context);
    }
  }

}

LogicalOrOperator.$pattern = /^\|\|/;

module.exports = LogicalOrOperator;
