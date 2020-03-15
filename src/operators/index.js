'use strict';

const AbstractOperator = require('./Abstract');

const FunctionCall = require('./FunctionCall');
const Unary = require('./Unary');
const Conditional = require('./Conditional');

// create index
const index = [

  require('./MemberAccess'),

  FunctionCall,

  require('./LogicalNot'),
  require('./BitwiseNot'),

  Unary.Plus,
  Unary.Negation,

  require('./Typeof'),

  require('./Multiply'),
  require('./Divide'),
  require('./Modulo'),
  require('./Plus'),
  require('./Minus'),

  require('./GreaterEq'),
  require('./LessEq'),
  require('./Greater'),
  require('./Less'),

  require('./Instanceof'),
  require('./In'),

  require('./Identity'),
  require('./Nonidentity'),
  require('./Equality'),
  require('./Inequality'),

  require('./LogicalAnd'),
  require('./LogicalOr'),

  require('./BitwiseAnd'),
  require('./BitwiseOr'),
  require('./BitwiseXor'),

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
