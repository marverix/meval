/* eslint-disable no-unused-vars */
'use strict';

const AbstractOperator = require('./Abstract');

class Abstract1ArgOperator extends AbstractOperator {

  constructor () {
    super();
  }

  execute (context, myIndex, entities) {
    let rightSide = entities[myIndex + 1];

    let result = rightSide instanceof AbstractOperator ?
      this._executeForOperator(rightSide, context) :
      this._executeForConsumer(rightSide, context);

    if (result === null) {
      entities.splice(myIndex, 2);
    } else {
      entities.splice(myIndex, 2, result);
    }
  }

  _executeForOperator (rightSide, context) {
    throw new Error('Overwrite this method!');
  }

  _executeForConsumer (rightSide, context) {
    throw new Error('Overwrite this method!');
  }

}

Abstract1ArgOperator.$prevMustntBeConsumer = true;

module.exports = Abstract1ArgOperator;
