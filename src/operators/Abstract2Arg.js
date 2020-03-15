/* eslint-disable no-unused-vars */
'use strict';

const AbstractOperator = require('./Abstract');

class Abstract2ArgOperator extends AbstractOperator {

  constructor () {
    super();
  }

  execute (context, myIndex, entities) {
    let prevIndex = myIndex - 1;
    let result = this._execute(entities[prevIndex], entities[myIndex + 1], context);
    entities.splice(prevIndex, 3, result);
  }

  _execute (leftSide, rightSide, context) {
    throw new Error('Overwrite this method!');
  }

}

Abstract2ArgOperator.$prevMustBeConsumer = true;

module.exports = Abstract2ArgOperator;
