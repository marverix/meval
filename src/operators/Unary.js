'use strict';

const Abstract1ArgOperator = require('./Abstract1Arg');


class UnaryNegationOperator extends Abstract1ArgOperator {

  constructor () {
    super();
  }

  _executeForOperator (rightSide) {
    if (rightSide instanceof UnaryNegationOperator) {
      return new UnaryPlusOperator();
    } else if (rightSide instanceof UnaryNegationOperator) {
      return this;
    } else {
      throw new Error('Invalid usage of unary negation');
    }
  }

  _executeForConsumer (rightSide, context) {
    return - this.resolveSide(rightSide, context);
  }

}

UnaryNegationOperator.$pattern = /^-/;


class UnaryPlusOperator extends Abstract1ArgOperator {

  constructor () {
    super();
  }

  _executeForOperator (rightSide) {
    if (rightSide instanceof UnaryPlusOperator) {
      return this;
    } else if (rightSide instanceof UnaryNegationOperator) {
      return new UnaryNegationOperator();
    } else {
      throw new Error('Invalid usage of unary plus');
    }
  }

  _executeForConsumer (rightSide, context) {
    return + this.resolveSide(rightSide, context);
  }

}

UnaryPlusOperator.$pattern = /^\+/;


module.exports = {
  Plus: UnaryPlusOperator,
  Negation: UnaryNegationOperator
};
