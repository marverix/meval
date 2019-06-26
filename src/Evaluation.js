import {
  REGEXP,
  ALLOWED_GLOBAL_OBJECTS,
  get1ArgOpRegex,
  get2ArgOpRegex
} from './Constants';

const commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
const searchFor3ArgOp = ['?', ':', null];

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
    parts = this._match3ArgOp(expression);
    if(parts != null) {
      return this._digest(parts[1]) ? this._digest(parts[2]) : this._digest(parts[3]);
    }

    // Check 2 argument operators

    // ||
    parts = this._match2ArgOp('\\|\\|', expression, false);
    if(parts != null) {
      if(parts[1]) {
        return parts[1];
      } else {
        return this._digest(parts[3]);
      }
    }

    // &&
    parts = this._match2ArgOp('&&', expression, false);
    if(parts != null) {
      if(parts[1]) {
        return this._digest(parts[3]);
      }
      return false;
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

    // Check 1 argument operators

    // !
    parts = this._match1ArgOp('!', expression);
    if(parts != null) {
      return !parts[2];
    }

    // typeof
    parts = this._match1ArgOp('typeof', expression);
    if(parts != null) {
      return typeof parts[2];
    }

    // Check paranthesis
    parts = expression.match(new RegExp(REGEXP.PARANTHESIS));
    if(parts != null) {
      return this._digest(parts[1]);
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

    // Check global properties
    parts = expression.match(new RegExp(REGEXP.GLOBAL_PROPERTIES));
    if(parts != null) {
      switch(parts[0]) {
      case 'null':
        return null;

      case 'NaN':
        return NaN;

      case 'Infinity':
        return Infinity;

      default:
        return undefined;
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
      return commonjsGlobal[expression];
    }

    // Return
    return this.context[expression];
  };

  /**
   * Match 1 argument operator
   * @param {String} op Operator to check
   * @param {String} expression
   * @private
   */
  this._match1ArgOp = function _match1ArgOp(op, expression) {
    var parts = expression.match(new RegExp(get1ArgOpRegex(op)));
    if(parts != null) {
      parts[2] = this._digest(parts[2]);
    }
    return parts;
  };

  /**
   * Match 2 argument operator
   * @param {String} op Operator to check
   * @param {String} expression
   * @private
   */
  this._match2ArgOp = function _match2ArgOp(op, expression, digestRightSide = true) {
    var parts = expression.match(new RegExp(get2ArgOpRegex(op)));
    if(parts != null) {
      if(this._hasLostParanthesis(parts[1]) || this._hasLostParanthesis(parts[3])) {
        return null;
      }

      parts[1] = this._digest(parts[1]);
      parts[3] = digestRightSide ? this._digest(parts[3]) : parts[3];
    }
    return parts;
  };

  /**
   * Match 3 argument operator
   * @param {String} expression
   * @returns {Array|null}
   */
  this._match3ArgOp = function _match3ArgOp(expression) {
    if(typeof expression !== 'string' || !new RegExp(REGEXP.THREE_ARG).test(expression)) {
      return null;
    }

    var char;
    var state = 0;
    var parts = [{
      match: '',
      paranthesis: 0
    }, {
      match: '',
      paranthesis: 0
    }, {
      match: '',
      paranthesis: 0
    }];

    for(let i = 0; i < expression.length; i++) {
      char = expression[i];

      if(searchFor3ArgOp[state] != null && char === searchFor3ArgOp[state] && parts[state].paranthesis === 0) {
        state++;
      } else {
        if(char === '(') {
          parts[state].paranthesis++;
        } else if(char === ')') {
          parts[state].paranthesis--;
        }

        parts[state].match += char;
      }
    }

    if(!parts[0].paranthesis && !parts[1].paranthesis && !parts[2].paranthesis) {
      let ret = [expression];

      for(let i = 0; i < 3; i++) {
        ret.push( this._stripParanthesis(parts[i].match) );
      }

      return ret;
    } else {
      return null;
    }
  };

  /**
   * Returns if given string has lost paranthesis
   * @param {String} str String to check
   * @returns {Boolean}
   */
  this._hasLostParanthesis = function _detectLostParanthesis(str) {
    var opening = str.match(/\(/g);
    opening = opening == null ? 0 : opening.length;

    var closing = str.match(/\)/g);
    closing = closing == null ? 0 : closing.length;

    return opening !== closing;
  };

  /**
   * Strip paranthesis
   * @param {String} str String that should stripped from border paranthesis
   */
  this._stripParanthesis = function _stripParanthesis(str) {
    var match = str.match(/^\s*\(\s*(.+)\s*\)\s*$/);
    return match == null ? str : match[1];
  };
}

export default Evaluation;
