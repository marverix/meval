const REGEXP = {};
REGEXP.NAME = '[A-Za-z$_][A-Za-z0-9$_.]*';
REGEXP.METHOD = `(${REGEXP.NAME})\\((.*)\\)`;
REGEXP.PART = `${REGEXP.NAME}(?:\\(.*\\))?`;
REGEXP.THREE_ARG = '^(.+)\\?(.+):(.+)$';
REGEXP.ACCESSOR = `(${REGEXP.PART})\\.(${REGEXP.PART})`;
REGEXP.STRING = '(["\\\'])([^"]*)\\1';
REGEXP.FLOAT = '[0-9]+\\.[0-9]+';
REGEXP.INTEGER = '[0-9]+';

const ALLOWED_GLOBAL_OBJECTS = ['String', 'Number', 'Array', 'Object', 'Date', 'Math'];

/**
 * Get regexp string for 2 argument operator
 * @param {String} op Operator
 */
function get2ArgOpRegex(op) {
  return `^(.+)(${op})(.+)$`;
}

module.exports = {
  REGEXP,
  ALLOWED_GLOBAL_OBJECTS,
  get2ArgOpRegex
};
