'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');


/**
 * Multiplication
 */
class MultiplicationOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) * this.resolveSide(rightSide, context);
  }

}

MultiplicationOperator.$pattern = /^\*/;


/**
 * Division
 */
class DivisionOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) / this.resolveSide(rightSide, context);
  }

}

DivisionOperator.$pattern = /^\//;


/**
 * Remainder
 */
class RemainderOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) % this.resolveSide(rightSide, context);
  }

}

RemainderOperator.$pattern = /^%/;


/**
 * Addition
 */
class AdditionOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) + this.resolveSide(rightSide, context);
  }

}

AdditionOperator.$pattern = /^\+/;


/**
 * Subtraction
 */

class SubtractionOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) - this.resolveSide(rightSide, context);
  }

}

SubtractionOperator.$pattern = /^-/;


// Export
module.exports = {
  Multiplication: MultiplicationOperator,
  Division: DivisionOperator,
  Remainder: RemainderOperator,
  Addition: AdditionOperator,
  Subtraction: SubtractionOperator
};
