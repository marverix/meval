'use strict';

const AbstractOperator = require('./Abstract');

const FunctionCall = require('./FunctionCall');
const Logical = require('./Logical');
const Unary = require('./Unary');
const Arithmetic = require('./Arithmetic');
const Comparison = require('./Comparison');
const Conditional = require('./Conditional');


// create index
const index = [

  require('./MemberAccess'),

  FunctionCall,

  Logical.Not,

  Unary.Plus,
  Unary.Negation,

  require('./Typeof'),

  Arithmetic.Multiplication,
  Arithmetic.Division,
  Arithmetic.Remainder,
  Arithmetic.Addition,
  Arithmetic.Subtraction,

  Comparison.GreaterEq,
  Comparison.LessEq,
  Comparison.Greater,
  Comparison.Less,
  Comparison.Instanceof,
  Comparison.In,

  Comparison.Identity,
  Comparison.Nonidentity,
  Comparison.Equality,
  Comparison.Inequality,

  Logical.And,
  Logical.Or,

  Conditional.Start,
  Conditional.End,

];

// set priority
for (let i = 0; i < index.length; i++) {
  index[i].$priority = index.length - i;
}

/**
 * Check is given something is an Operator
 * @param {*} sth
 * @returns {boolean}
 */
function isOperator (sth) {
  return sth instanceof AbstractOperator;
}

/**
 * Find proper Operator
 * @param {string} str
 * @param {number} isLastEntityConsumer
 * @returns {AbstractOperator}
 */
function find (str, isLastEntityConsumer) {
  for (let entity of index) {
    if (entity.$pattern != null && entity.$pattern.test(str) && (
      !entity.$prevMustBeConsumer && !isLastEntityConsumer ||
      !entity.$prevMustntBeConsumer && isLastEntityConsumer
    )) {
      return entity;
    }
  }

  return null;
}

module.exports = {
  find,
  isOperator,

  FunctionCall
};
