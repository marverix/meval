import { REGEXP, ALLOWED_GLOBAL_OBJECTS, get2ArgOpRegex } from './Constants';

/**
 * Evaluation of expression in given context
 *
 * @param {String} expression
 * @param {Object} context
 */
function Evaluation(expression, context) {
  if(typeof expression !== 'string') {
    throw new TypeError('Expressions must be a string');
  }

  this.expression = expression;
  this.context = context;

  /**
   * Run
   * Start digesting expression
   */
  this.run = function run() {
    this.current = [];
    return this._digest(this.expression);
  };

  /**
   * Digest given expression
   * @param {String} expression
   * @private
   */
  this._digest = function _digest(expression) {
    var parts;
    expression = expression.trim();

    // Check 3 argument operator
    parts = expression.match(new RegExp(REGEXP.THREE_ARG));
    if(parts != null) {
      return this._digest(parts[1]) ? this._digest(parts[2]) : this._digest(parts[3]);
    }

    // Check 2 argument operstors

    // ||
    parts = this._match2ArgOp('\\|\\|', expression);
    if(parts != null) {
      return parts[1] || parts[3];
    }

    // &&
    parts = this._match2ArgOp('&&', expression);
    if(parts != null) {
      return parts[1] && parts[3];
    }

    // !==
    parts = this._match2ArgOp('!==', expression);
    if(parts != null) {
      return parts[1] !== parts[3];
    }

    // ===
    parts = this._match2ArgOp('===', expression);
    if(parts != null) {
      return parts[1] === parts[3];
    }

    // !=
    parts = this._match2ArgOp('!=', expression);
    if(parts != null) {
      return parts[1] != parts[3];
    }

    // ==
    parts = this._match2ArgOp('==', expression);
    if(parts != null) {
      return parts[1] == parts[3];
    }

    // <=
    parts = this._match2ArgOp('<=', expression);
    if(parts != null) {
      return parts[1] <= parts[3];
    }

    // >=
    parts = this._match2ArgOp('>=', expression);
    if(parts != null) {
      return parts[1] >= parts[3];
    }

    // <
    parts = this._match2ArgOp('<', expression);
    if(parts != null) {
      return parts[1] < parts[3];
    }

    // >
    parts = this._match2ArgOp('>', expression);
    if(parts != null) {
      return parts[1] > parts[3];
    }

    // -
    parts = this._match2ArgOp('-', expression);
    if(parts != null) {
      return parts[1] - parts[3];
    }

    // +
    parts = this._match2ArgOp('\\+', expression);
    if(parts != null) {
      return parts[1] + parts[3];
    }

    // %
    parts = this._match2ArgOp('%', expression);
    if(parts != null) {
      return parts[1] % parts[3];
    }

    // /
    parts = this._match2ArgOp('\\/', expression);
    if(parts != null) {
      return parts[1] / parts[3];
    }

    // *
    parts = this._match2ArgOp('\\*', expression);
    if(parts != null) {
      return parts[1] * parts[3];
    }


    // Check accessor
    parts = expression.match(new RegExp(REGEXP.ACCESSOR));
    if(parts != null) {
      let leftSide = this._digest(parts[1]);
      let rightSide = parts[2];

      parts = rightSide.match(new RegExp(REGEXP.METHOD));
      if(parts == null) {
        return leftSide[rightSide];
      } else {
        let args = parts[2].split(',');
        for(let i = 0; i < args.length; i++) {
          args[i] = this._digest(args[i]);
        }
        return leftSide[parts[1]].apply(leftSide, args);
      }
    }

    // Check boolean
    parts = expression.match(new RegExp(REGEXP.BOOLEAN));
    if(parts != null) {
      return parts[0] == 'true';
    }

    // Check string
    parts = expression.match(new RegExp(REGEXP.STRING));
    if(parts != null) {
      return parts[2];
    }

    // Check float
    parts = expression.match(new RegExp(REGEXP.FLOAT));
    if(parts != null) {
      return parseFloat(parts[0]);
    }

    // Check integer
    parts = expression.match(new RegExp(REGEXP.INTEGER));
    if(parts != null) {
      return parseInt(parts[0]);
    }

    // Check allowed global objects
    if(ALLOWED_GLOBAL_OBJECTS.indexOf(expression) > -1) {
      return global[expression];
    }

    // Return
    return this.context[expression];
  };

  /**
   * Match 2 argument operator
   * @param {String} op Operator to check
   * @param {String} expression
   * @private
   */
  this._match2ArgOp = function _match2ArgOp(op, expression) {
    var parts = expression.match(new RegExp(get2ArgOpRegex(op)));
    if(parts != null) {
      parts[1] = this._digest(parts[1]);
      parts[3] = this._digest(parts[3]);
    }
    return parts;
  };
}

export default Evaluation;
