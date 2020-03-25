'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class MemberAccessOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    try {
      leftSide = this.resolveSide(leftSide, context);
      rightSide = this.resolveSide(rightSide, false);

      let result = leftSide[rightSide];
      if (typeof result === 'function') {
        result = result.bind(leftSide);
      }

      return result;
    } catch (e) {
      return e;
    }
  }

}

MemberAccessOperator.$pattern = /^\./;

module.exports = MemberAccessOperator;
