/* meval v0.6.2 | Copyright 2019 (c) Marek Sierociński| https://github.com/marverix/meval/blob/master/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.meval = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var REGEXP = {};
  REGEXP.NAME = '[A-Za-z$_][A-Za-z0-9$_.]*';
  REGEXP.METHOD = "(".concat(REGEXP.NAME, ")\\((.*)\\)");
  REGEXP.PART = "".concat(REGEXP.NAME, "(?:\\(.*\\))?");
  REGEXP.PARANTHESIS = '(?:^| )\\(([^)]+)\\)';
  REGEXP.THREE_ARG = '^.+\\?.+:.+$';
  REGEXP.ACCESSOR = "(".concat(REGEXP.PART, ")\\.(").concat(REGEXP.PART, ")");
  REGEXP.STRING = '(["\\\'])([^"]*)\\1';
  REGEXP.FLOAT = '[0-9]+\\.[0-9]+';
  REGEXP.INTEGER = '[0-9]+';
  REGEXP.BOOLEAN = 'true|false';
  REGEXP.GLOBAL_PROPERTIES = 'undefined|null|NaN|Infinity';
  var ALLOWED_GLOBAL_OBJECTS = ['String', 'Number', 'Array', 'Object', 'Date', 'Math', 'location', 'navigator'];
  /**
   * Get regexp string for 1 argument operator
   * @param {String} op Operator
   */

  function get1ArgOpRegex(op) {
    return "^(".concat(op, ")(.+)$");
  }
  /**
   * Get regexp string for 2 argument operator
   * @param {String} op Operator
   */


  function get2ArgOpRegex(op) {
    return "^(.+)(".concat(op, ")(.+)$");
  }

  var Constants = {
    REGEXP: REGEXP,
    ALLOWED_GLOBAL_OBJECTS: ALLOWED_GLOBAL_OBJECTS,
    get1ArgOpRegex: get1ArgOpRegex,
    get2ArgOpRegex: get2ArgOpRegex
  };
  var Constants_1 = Constants.REGEXP;
  var Constants_2 = Constants.ALLOWED_GLOBAL_OBJECTS;
  var Constants_3 = Constants.get1ArgOpRegex;
  var Constants_4 = Constants.get2ArgOpRegex;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  var searchFor3ArgOp = ['?', ':', null];
  /**
   * Evaluation of expression in given context
   *
   * @param {String} expression
   * @param {Object} context
   */

  function Evaluation(expression, context) {
    if (typeof expression !== 'string') {
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
      expression = expression.trim(); // Check 3 argument operator

      parts = this._match3ArgOp(expression);

      if (parts != null) {
        return this._digest(parts[1]) ? this._digest(parts[2]) : this._digest(parts[3]);
      } // Check 2 argument operators
      // ||


      parts = this._match2ArgOp('\\|\\|', expression, false);

      if (parts != null) {
        if (parts[1]) {
          return parts[1];
        } else {
          return this._digest(parts[3]);
        }
      } // &&


      parts = this._match2ArgOp('&&', expression, false);

      if (parts != null) {
        if (parts[1]) {
          return this._digest(parts[3]);
        }

        return false;
      } // !==


      parts = this._match2ArgOp('!==', expression);

      if (parts != null) {
        return parts[1] !== parts[3];
      } // ===


      parts = this._match2ArgOp('===', expression);

      if (parts != null) {
        return parts[1] === parts[3];
      } // !=


      parts = this._match2ArgOp('!=', expression);

      if (parts != null) {
        return parts[1] != parts[3];
      } // ==


      parts = this._match2ArgOp('==', expression);

      if (parts != null) {
        return parts[1] == parts[3];
      } // <=


      parts = this._match2ArgOp('<=', expression);

      if (parts != null) {
        return parts[1] <= parts[3];
      } // >=


      parts = this._match2ArgOp('>=', expression);

      if (parts != null) {
        return parts[1] >= parts[3];
      } // <


      parts = this._match2ArgOp('<', expression);

      if (parts != null) {
        return parts[1] < parts[3];
      } // >


      parts = this._match2ArgOp('>', expression);

      if (parts != null) {
        return parts[1] > parts[3];
      } // -


      parts = this._match2ArgOp('-', expression);

      if (parts != null) {
        return parts[1] - parts[3];
      } // +


      parts = this._match2ArgOp('\\+', expression);

      if (parts != null) {
        return parts[1] + parts[3];
      } // %


      parts = this._match2ArgOp('%', expression);

      if (parts != null) {
        return parts[1] % parts[3];
      } // /


      parts = this._match2ArgOp('\\/', expression);

      if (parts != null) {
        return parts[1] / parts[3];
      } // *


      parts = this._match2ArgOp('\\*', expression);

      if (parts != null) {
        return parts[1] * parts[3];
      } // Check 1 argument operators
      // !


      parts = this._match1ArgOp('!', expression);

      if (parts != null) {
        return !parts[2];
      } // typeof


      parts = this._match1ArgOp('typeof', expression);

      if (parts != null) {
        return _typeof(parts[2]);
      } // Check paranthesis


      parts = expression.match(new RegExp(Constants_1.PARANTHESIS));

      if (parts != null) {
        return this._digest(parts[1]);
      } // Check accessor


      parts = expression.match(new RegExp(Constants_1.ACCESSOR));

      if (parts != null) {
        var leftSide = this._digest(parts[1]);

        var rightSide = parts[2];
        parts = rightSide.match(new RegExp(Constants_1.METHOD));

        if (parts == null) {
          return leftSide[rightSide];
        } else {
          var args = parts[2].split(',');

          for (var i = 0; i < args.length; i++) {
            args[i] = this._digest(args[i]);
          }

          return leftSide[parts[1]].apply(leftSide, args);
        }
      } // Check global properties


      parts = expression.match(new RegExp(Constants_1.GLOBAL_PROPERTIES));

      if (parts != null) {
        switch (parts[0]) {
          case 'null':
            return null;

          case 'NaN':
            return NaN;

          case 'Infinity':
            return Infinity;

          default:
            return undefined;
        }
      } // Check boolean


      parts = expression.match(new RegExp(Constants_1.BOOLEAN));

      if (parts != null) {
        return parts[0] == 'true';
      } // Check string


      parts = expression.match(new RegExp(Constants_1.STRING));

      if (parts != null) {
        return parts[2];
      } // Check float


      parts = expression.match(new RegExp(Constants_1.FLOAT));

      if (parts != null) {
        return parseFloat(parts[0]);
      } // Check integer


      parts = expression.match(new RegExp(Constants_1.INTEGER));

      if (parts != null) {
        return parseInt(parts[0]);
      } // Check allowed global objects


      if (Constants_2.indexOf(expression) > -1) {
        return commonjsGlobal[expression];
      } // Return


      return this.context[expression];
    };
    /**
     * Match 1 argument operator
     * @param {String} op Operator to check
     * @param {String} expression
     * @private
     */


    this._match1ArgOp = function _match1ArgOp(op, expression) {
      var parts = expression.match(new RegExp(Constants_3(op)));

      if (parts != null) {
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


    this._match2ArgOp = function _match2ArgOp(op, expression) {
      var digestRightSide = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var parts = expression.match(new RegExp(Constants_4(op)));

      if (parts != null) {
        if (this._hasLostParanthesis(parts[1]) || this._hasLostParanthesis(parts[3])) {
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
      if (typeof expression !== 'string' || !new RegExp(Constants_1.THREE_ARG).test(expression)) {
        return null;
      }

      var _char;

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

      for (var i = 0; i < expression.length; i++) {
        _char = expression[i];

        if (searchFor3ArgOp[state] != null && _char === searchFor3ArgOp[state] && parts[state].paranthesis === 0) {
          state++;
        } else {
          if (_char === '(') {
            parts[state].paranthesis++;
          } else if (_char === ')') {
            parts[state].paranthesis--;
          }

          parts[state].match += _char;
        }
      }

      if (!parts[0].paranthesis && !parts[1].paranthesis && !parts[2].paranthesis) {
        var ret = [expression];

        for (var _i = 0; _i < 3; _i++) {
          ret.push(this._stripParanthesis(parts[_i].match));
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

  /**
   * meval
   * @param {String} expression Expression to be parsed
   * @param {Object} context Context for expression
   */

  function meval(expression) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Evaluation(expression, context).run();
  }

  return meval;

}));
