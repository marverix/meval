'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');


/**
 * GreaterEq
 */
class GreaterEqOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) >= this.resolveSide(rightSide, context);
  }

}

GreaterEqOperator.$pattern = /^>=/;


/**
 * LessEq
 */
class LessEqOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) <= this.resolveSide(rightSide, context);
  }

}

LessEqOperator.$pattern = /^<=/;


/**
 * Greater
 */
class GreaterOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) > this.resolveSide(rightSide, context);
  }

}

GreaterOperator.$pattern = /^>/;


/**
 * Less
 */
class LessOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) < this.resolveSide(rightSide, context);
  }

}

LessOperator.$pattern = /^</;


/**
 * Instanceof
 */
class InstanceofOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) instanceof this.resolveSide(rightSide, context);
  }

}

InstanceofOperator.$pattern = /^instanceof/;


/**
 * In
 */
class InOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) in this.resolveSide(rightSide, context);
  }

}

InOperator.$pattern = /^in/;


/**
 * Identity
 */
class IdentityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) === this.resolveSide(rightSide, context);
  }

}

IdentityOperator.$pattern = /^===/;


/**
 * Nonidentity
 */
class NonidentityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) !== this.resolveSide(rightSide, context);
  }

}

NonidentityOperator.$pattern = /^!==/;


/**
 * Equality
 */
class EqualityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) == this.resolveSide(rightSide, context);
  }

}

EqualityOperator.$pattern = /^==/;


/**
 * Inequality
 */
class InequalityOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) != this.resolveSide(rightSide, context);
  }

}

InequalityOperator.$pattern = /^!=/;


// Export
module.exports = {
  GreaterEq: GreaterEqOperator,
  LessEq: LessEqOperator,
  Greater: GreaterOperator,
  Less: LessOperator,

  Instanceof: InstanceofOperator,
  In: InOperator,

  Identity: IdentityOperator,
  Nonidentity: NonidentityOperator,
  Equality: EqualityOperator,
  Inequality: InequalityOperator
};
