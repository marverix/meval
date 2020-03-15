'use strict';

const Abstract1ArgOperator = require('./Abstract1Arg');

class TypeofOperator extends Abstract1ArgOperator {

  constructor () {
    super();
  }

  _executeForOperator () {
    throw new Error('Invalid usage of typeof');
  }

  _executeForConsumer (rightSide, context) {
    return typeof this.resolveSide(rightSide, context);
  }

}

TypeofOperator.$pattern = /^typeof(?![A-Za-z0-9$_])/;

module.exports = TypeofOperator;
