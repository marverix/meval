'use strict';

const Abstract1ArgOperator = require('./Abstract1Arg');

class LogicalNotOperator extends Abstract1ArgOperator {

  constructor () {
    super();
  }

  _executeForOperator (rightSide) {
    if (rightSide instanceof LogicalNotOperator) {
      return null;
    } else {
      throw new Error('Invalid usage of logical not');
    }
  }

  _executeForConsumer (rightSide, context) {
    return ! this.resolveSide(rightSide, context);
  }


}

LogicalNotOperator.$pattern = /^!(?!=)/;

module.exports = LogicalNotOperator;
