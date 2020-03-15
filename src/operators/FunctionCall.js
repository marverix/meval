/* eslint-disable no-unused-vars */
'use strict';

const AbstractOperator = require('./Abstract');

class FunctionCallOperator extends AbstractOperator {

  constructor (args) {
    super();
    this.args = args;
  }

  execute (context, myIndex, entities) {
    let prevIndex = myIndex - 1;
    let leftSide = this.resolveSide(entities[prevIndex], context);
    let result = leftSide.apply(null, this.args);

    entities.splice(prevIndex, 2, result);
  }

}

FunctionCallOperator.$pattern = null;
FunctionCallOperator.$prevMustBeConsumer = true;

module.exports = FunctionCallOperator;
