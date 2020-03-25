'use strict';

const Abstract1ArgOperator = require('./Abstract1Arg');
const Abstract2ArgOperator = require('./Abstract2Arg');


/**
 * Not
 */
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


/**
 * And
 */
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


/**
 * Or
 */
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


// Export
module.exports = {
  Not: LogicalNotOperator,
  And: LogicalAndOperator,
  Or: LogicalOrOperator
};
