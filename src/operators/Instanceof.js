'use strict';

const Abstract2ArgOperator = require('./Abstract2Arg');

class InstanceofOperator extends Abstract2ArgOperator {

  constructor () {
    super();
  }

  _execute (leftSide, rightSide, context) {
    return this.resolveSide(leftSide, context) instanceof this.resolveSide(rightSide, context);
  }

}

InstanceofOperator.$pattern = /^instanceof/;

module.exports = InstanceofOperator;
