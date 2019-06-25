import Evaluation from './Evaluation';

/**
 * meval
 * @param {String} expression Expression to be parsed
 * @param {Object} context Context for expression
 */
function meval(expression, context = {}) {
  return new Evaluation(expression, context).run();
}

export default meval;
