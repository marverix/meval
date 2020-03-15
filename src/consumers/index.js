'use strict';

const AbstractConsumer = require('./Abstract');

const index = [
  require('./Number'),
  require('./Boolean'),
  require('./SpecialProperty'),
  require('./String'),
  require('./Property')
];

/**
 * Check is given something is a Consumer
 * @param {*} sth
 * @returns {boolean}
 */
function isConsumer (sth) {
  return sth instanceof AbstractConsumer;
}

/**
 * Find proper Consumer
 * @param {string} str
 * @returns {AbstractConsumer}
 */
function find (str) {
  for (let entity of index) {
    if (entity.$pattern.test(str)) {
      return entity;
    }
  }

  return null;
}

module.exports = {
  find,
  isConsumer
};
