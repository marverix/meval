/* meval v0.2.0 | Copyright 2019 (c) Marek Sierociński| https://github.com/marverix/meval/blob/master/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.meval = factory());
}(this, function () { 'use strict';

  var REGEXP = {};
  REGEXP.NAME = '[A-Za-z$_][A-Za-z0-9$_.]*';
  REGEXP.METHOD = "(".concat(REGEXP.NAME, ")\\((.*)\\)");
  REGEXP.PART = "".concat(REGEXP.NAME, "(?:\\(.*\\))?");
  REGEXP.THREE_ARG = '^(.+)\\?(.+):(.+)$';
  REGEXP.ACCESSOR = "(".concat(REGEXP.PART, ")\\.(").concat(REGEXP.PART, ")");
  REGEXP.STRING = '(["\\\'])([^"]*)\\1';
  REGEXP.FLOAT = '[0-9]+\\.[0-9]+';
  REGEXP.INTEGER = '[0-9]+';
  REGEXP.BOOLEAN = 'true|false';
  var ALLOWED_GLOBAL_OBJECTS = ['String', 'Number', 'Array', 'Object', 'Date', 'Math'];
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

      parts = expression.match(new RegExp(Constants_1.THREE_ARG));

      if (parts != null) {
        return this._digest(parts[1]) ? this._digest(parts[2]) : this._digest(parts[3]);
      } // Check 2 argument operators
      // ||


      parts = this._match2ArgOp('\\|\\|', expression);

      if (parts != null) {
        return parts[1] || parts[3];
      } // &&


      parts = this._match2ArgOp('&&', expression);

      if (parts != null) {
        return parts[1] && parts[3];
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
        return global[expression];
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
      var parts = expression.match(new RegExp(Constants_4(op)));

      if (parts != null) {
        parts[1] = this._digest(parts[1]);
        parts[3] = this._digest(parts[3]);
      }

      return parts;
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
