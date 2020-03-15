/* meval v0.7.0 | Copyright 2020 (c) Marek Sierociński| https://github.com/marverix/meval/blob/master/LICENSE */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.meval = factory());
}(this, (function () { 'use strict';

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /* eslint-disable no-unused-vars */

  var AbstractEntity =
  /*#__PURE__*/
  function () {
    function AbstractEntity() {
      _classCallCheck(this, AbstractEntity);

      this.data = '';
    }

    _createClass(AbstractEntity, [{
      key: "add",
      value: function add(_char) {
        this.data += _char;
      }
    }, {
      key: "take",
      value: function take(_char2) {
        throw new Error('Overwrite this method!');
      }
    }, {
      key: "$pattern",
      get: function get() {
        return this.constructor.$pattern;
      }
    }]);

    return AbstractEntity;
  }();

  var AbstractEntity_1 = AbstractEntity;

  var AbstractConsumer =
  /*#__PURE__*/
  function (_AbstractEntity) {
    _inherits(AbstractConsumer, _AbstractEntity);

    function AbstractConsumer() {
      _classCallCheck(this, AbstractConsumer);

      return _possibleConstructorReturn(this, _getPrototypeOf(AbstractConsumer).call(this));
    }

    _createClass(AbstractConsumer, [{
      key: "resolve",
      value: function resolve(context) {
        // Overwrite this method
        return this.data;
      }
    }, {
      key: "last",
      get: function get() {
        return this.data[this.data.length - 1];
      }
    }]);

    return AbstractConsumer;
  }(AbstractEntity_1);

  var Abstract = AbstractConsumer;

  var TakeResponseEnum = {
    REJECT: -1,
    OK: 0,
    OK_CONTENTED: 1
  };

  var NumberConsumer =
  /*#__PURE__*/
  function (_AbstractConsumer) {
    _inherits(NumberConsumer, _AbstractConsumer);

    function NumberConsumer() {
      var _this;

      _classCallCheck(this, NumberConsumer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberConsumer).call(this));
      _this.hasDot = false;
      return _this;
    }

    _createClass(NumberConsumer, [{
      key: "take",
      value: function take(_char) {
        if (this.$pattern.test(_char)) {
          this.add(_char);
        } else if (_char === '.' && !this.hasDot) {
          this.add(_char);
          this.hasDot = true;
        } else {
          return TakeResponseEnum.REJECT;
        }

        return TakeResponseEnum.OK;
      }
    }, {
      key: "resolve",
      value: function resolve() {
        if (this.last === '.') {
          throw new Error('Unexpected end of the float number!');
        }

        return this.hasDot ? parseFloat(this.data) : parseInt(this.data, 10);
      }
    }]);

    return NumberConsumer;
  }(Abstract);

  NumberConsumer.$pattern = /^\d/;
  var _Number = NumberConsumer;

  var BooleanConsumer =
  /*#__PURE__*/
  function (_AbstractConsumer) {
    _inherits(BooleanConsumer, _AbstractConsumer);

    function BooleanConsumer() {
      _classCallCheck(this, BooleanConsumer);

      return _possibleConstructorReturn(this, _getPrototypeOf(BooleanConsumer).call(this));
    }

    _createClass(BooleanConsumer, [{
      key: "take",
      value: function take(_char) {
        this.add(_char);

        if (this.$pattern.test(this.data)) {
          return TakeResponseEnum.OK_CONTENTED;
        } else {
          return TakeResponseEnum.OK;
        }
      }
    }, {
      key: "resolve",
      value: function resolve() {
        switch (this.data) {
          case 'true':
            return true;

          case 'false':
            return false;

          default:
            throw new Error('Unexpected end of the boolean');
        }
      }
    }]);

    return BooleanConsumer;
  }(Abstract);

  BooleanConsumer.$pattern = /^(?:true|false)/;
  var _Boolean = BooleanConsumer;

  var SpecialPropertyConsumer =
  /*#__PURE__*/
  function (_AbstractConsumer) {
    _inherits(SpecialPropertyConsumer, _AbstractConsumer);

    function SpecialPropertyConsumer() {
      _classCallCheck(this, SpecialPropertyConsumer);

      return _possibleConstructorReturn(this, _getPrototypeOf(SpecialPropertyConsumer).call(this));
    }

    _createClass(SpecialPropertyConsumer, [{
      key: "take",
      value: function take(_char) {
        this.add(_char);

        if (this.$pattern.test(this.data)) {
          return TakeResponseEnum.OK_CONTENTED;
        } else {
          return TakeResponseEnum.OK;
        }
      }
    }, {
      key: "resolve",
      value: function resolve() {
        switch (this.data) {
          case 'undefined':
            return undefined;

          case 'null':
            return null;

          case 'NaN':
            return NaN;

          case 'Infinity':
            return Infinity;

          default:
            throw new Error('Unexpected end of the property');
        }
      }
    }]);

    return SpecialPropertyConsumer;
  }(Abstract);

  SpecialPropertyConsumer.$pattern = /^(?:undefined|null|NaN|Infinity)/;
  var SpecialProperty = SpecialPropertyConsumer;

  var StringConsumer =
  /*#__PURE__*/
  function (_AbstractConsumer) {
    _inherits(StringConsumer, _AbstractConsumer);

    function StringConsumer() {
      var _this;

      _classCallCheck(this, StringConsumer);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(StringConsumer).call(this));
      _this.delimiter = null;
      _this.escape = false;
      return _this;
    }

    _createClass(StringConsumer, [{
      key: "take",
      value: function take(_char) {
        if (this.delimiter == null) {
          this.delimiter = _char;
          return TakeResponseEnum.OK;
        } else if (_char === this.delimiter) {
          if (this.escape) {
            this.add(this.delimiter);
            this.escape = false;
            return TakeResponseEnum.OK;
          } else {
            this.delimiter = null;
            return TakeResponseEnum.OK_CONTENTED;
          }
        } else if (!this.escape && _char === '\\') {
          this.escape = true;
          return TakeResponseEnum.OK;
        } else {
          if (this.escape) {
            this.add('\\');
            this.escape = false;
          }

          this.add(_char);
          return TakeResponseEnum.OK;
        }
      }
    }, {
      key: "resolve",
      value: function resolve() {
        if (this.delimiter != null) {
          throw new Error('Unexpected end of the string!');
        }

        return this.data;
      }
    }]);

    return StringConsumer;
  }(Abstract);

  StringConsumer.$pattern = /^['"`]/;
  var _String = StringConsumer;

  var innerPattern = /^[$_A-Za-z0-9]/;

  var PropertyConsumer =
  /*#__PURE__*/
  function (_AbstractConsumer) {
    _inherits(PropertyConsumer, _AbstractConsumer);

    function PropertyConsumer() {
      _classCallCheck(this, PropertyConsumer);

      return _possibleConstructorReturn(this, _getPrototypeOf(PropertyConsumer).call(this));
    }

    _createClass(PropertyConsumer, [{
      key: "take",
      value: function take(_char) {
        if (innerPattern.test(_char)) {
          this.add(_char);
          return TakeResponseEnum.OK;
        }

        return TakeResponseEnum.REJECT;
      }
    }, {
      key: "resolve",
      value: function resolve(context) {
        return context ? context[this.data] : this.data;
      }
    }]);

    return PropertyConsumer;
  }(Abstract);

  PropertyConsumer.$pattern = /^[$_A-Za-z]/;
  var Property = PropertyConsumer;

  var index = [_Number, _Boolean, SpecialProperty, _String, Property];
  /**
   * Check is given something is a Consumer
   * @param {*} sth
   * @returns {boolean}
   */

  function isConsumer(sth) {
    return sth instanceof Abstract;
  }
  /**
   * Find proper Consumer
   * @param {string} str
   * @returns {AbstractConsumer}
   */


  function find(str) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = index[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entity = _step.value;

        if (entity.$pattern.test(str)) {
          return entity;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  }

  var consumers = {
    find: find,
    isConsumer: isConsumer
  };

  var AbstractOperator =
  /*#__PURE__*/
  function (_AbstractEntity) {
    _inherits(AbstractOperator, _AbstractEntity);

    function AbstractOperator() {
      _classCallCheck(this, AbstractOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(AbstractOperator).call(this));
    }

    _createClass(AbstractOperator, [{
      key: "take",
      value: function take(_char) {
        if (this.$pattern == null) {
          throw new Error('Incorrect operator');
        }

        this.add(_char);

        if (this.$pattern.test(this.data)) {
          return TakeResponseEnum.OK_CONTENTED;
        } else {
          return TakeResponseEnum.OK;
        }
      }
    }, {
      key: "execute",
      value: function execute(context, myIndex, entities) {
        throw new Error('Overwrite this method!');
      }
    }, {
      key: "resolveSide",
      value: function resolveSide(side, context) {
        return side instanceof Abstract ? side.resolve(context) : side;
      }
    }, {
      key: "$priority",
      get: function get() {
        return this.constructor.$priority;
      }
    }]);

    return AbstractOperator;
  }(AbstractEntity_1);

  var Abstract$1 = AbstractOperator;

  var Abstract1ArgOperator =
  /*#__PURE__*/
  function (_AbstractOperator) {
    _inherits(Abstract1ArgOperator, _AbstractOperator);

    function Abstract1ArgOperator() {
      _classCallCheck(this, Abstract1ArgOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(Abstract1ArgOperator).call(this));
    }

    _createClass(Abstract1ArgOperator, [{
      key: "execute",
      value: function execute(context, myIndex, entities) {
        var rightSide = entities[myIndex + 1];
        var result = rightSide instanceof Abstract$1 ? this._executeForOperator(rightSide, context) : this._executeForConsumer(rightSide, context);

        if (result === null) {
          entities.splice(myIndex, 2);
        } else {
          entities.splice(myIndex, 2, result);
        }
      }
    }, {
      key: "_executeForOperator",
      value: function _executeForOperator(rightSide, context) {
        throw new Error('Overwrite this method!');
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        throw new Error('Overwrite this method!');
      }
    }]);

    return Abstract1ArgOperator;
  }(Abstract$1);

  Abstract1ArgOperator.$prevMustntBeConsumer = true;
  var Abstract1Arg = Abstract1ArgOperator;

  var UnaryNegationOperator =
  /*#__PURE__*/
  function (_Abstract1ArgOperator) {
    _inherits(UnaryNegationOperator, _Abstract1ArgOperator);

    function UnaryNegationOperator() {
      _classCallCheck(this, UnaryNegationOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(UnaryNegationOperator).call(this));
    }

    _createClass(UnaryNegationOperator, [{
      key: "_executeForOperator",
      value: function _executeForOperator(rightSide) {
        if (rightSide instanceof UnaryNegationOperator) {
          return new UnaryPlusOperator();
        } else if (rightSide instanceof UnaryNegationOperator) {
          return this;
        } else {
          throw new Error('Invalid usage of unary negation');
        }
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        return -this.resolveSide(rightSide, context);
      }
    }]);

    return UnaryNegationOperator;
  }(Abstract1Arg);

  UnaryNegationOperator.$pattern = /^-/;

  var UnaryPlusOperator =
  /*#__PURE__*/
  function (_Abstract1ArgOperator2) {
    _inherits(UnaryPlusOperator, _Abstract1ArgOperator2);

    function UnaryPlusOperator() {
      _classCallCheck(this, UnaryPlusOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(UnaryPlusOperator).call(this));
    }

    _createClass(UnaryPlusOperator, [{
      key: "_executeForOperator",
      value: function _executeForOperator(rightSide) {
        if (rightSide instanceof UnaryPlusOperator) {
          return this;
        } else if (rightSide instanceof UnaryNegationOperator) {
          return new UnaryNegationOperator();
        } else {
          throw new Error('Invalid usage of unary plus');
        }
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        return +this.resolveSide(rightSide, context);
      }
    }]);

    return UnaryPlusOperator;
  }(Abstract1Arg);

  UnaryPlusOperator.$pattern = /^\+/;
  var Unary = {
    Plus: UnaryPlusOperator,
    Negation: UnaryNegationOperator
  };

  var err = 'Invalid usage of three-argument operator';

  var ConditionalStartOperator =
  /*#__PURE__*/
  function (_AbstractOperator) {
    _inherits(ConditionalStartOperator, _AbstractOperator);

    function ConditionalStartOperator() {
      _classCallCheck(this, ConditionalStartOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(ConditionalStartOperator).call(this));
    }

    _createClass(ConditionalStartOperator, [{
      key: "execute",
      value: function execute(context, myIndex, entities) {
        var prevIndex = myIndex - 1;
        var endOpIndex = myIndex + 2;

        if (!(entities[endOpIndex] instanceof ConditionalEndOperator)) {
          throw new Error(err);
        }

        var result = this.resolveSide(entities[prevIndex], context) ? this.resolveSide(entities[myIndex + 1], context) : this.resolveSide(entities[myIndex + 3], context);
        entities.splice(prevIndex, 5, result);
      }
    }]);

    return ConditionalStartOperator;
  }(Abstract$1);

  ConditionalStartOperator.$prevMustBeConsumer = true;
  ConditionalStartOperator.$pattern = /^\?/;

  var ConditionalEndOperator =
  /*#__PURE__*/
  function (_AbstractOperator2) {
    _inherits(ConditionalEndOperator, _AbstractOperator2);

    function ConditionalEndOperator() {
      _classCallCheck(this, ConditionalEndOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(ConditionalEndOperator).call(this));
    }

    _createClass(ConditionalEndOperator, [{
      key: "execute",
      value: function execute() {
        throw new Error(err);
      }
    }]);

    return ConditionalEndOperator;
  }(Abstract$1);

  ConditionalEndOperator.$prevMustBeConsumer = true;
  ConditionalEndOperator.$pattern = /^:/;
  var Conditional = {
    Start: ConditionalStartOperator,
    End: ConditionalEndOperator
  };

  var Abstract2ArgOperator =
  /*#__PURE__*/
  function (_AbstractOperator) {
    _inherits(Abstract2ArgOperator, _AbstractOperator);

    function Abstract2ArgOperator() {
      _classCallCheck(this, Abstract2ArgOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(Abstract2ArgOperator).call(this));
    }

    _createClass(Abstract2ArgOperator, [{
      key: "execute",
      value: function execute(context, myIndex, entities) {
        var prevIndex = myIndex - 1;

        var result = this._execute(entities[prevIndex], entities[myIndex + 1], context);

        entities.splice(prevIndex, 3, result);
      }
    }, {
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        throw new Error('Overwrite this method!');
      }
    }]);

    return Abstract2ArgOperator;
  }(Abstract$1);

  Abstract2ArgOperator.$prevMustBeConsumer = true;
  var Abstract2Arg = Abstract2ArgOperator;

  var MemberAccessOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(MemberAccessOperator, _Abstract2ArgOperator);

    function MemberAccessOperator() {
      _classCallCheck(this, MemberAccessOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(MemberAccessOperator).call(this));
    }

    _createClass(MemberAccessOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        leftSide = this.resolveSide(leftSide, context);
        rightSide = this.resolveSide(rightSide, false);
        return leftSide[rightSide];
      }
    }]);

    return MemberAccessOperator;
  }(Abstract2Arg);

  MemberAccessOperator.$pattern = /^\./;
  var MemberAccess = MemberAccessOperator;

  var LogicalNotOperator =
  /*#__PURE__*/
  function (_Abstract1ArgOperator) {
    _inherits(LogicalNotOperator, _Abstract1ArgOperator);

    function LogicalNotOperator() {
      _classCallCheck(this, LogicalNotOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LogicalNotOperator).call(this));
    }

    _createClass(LogicalNotOperator, [{
      key: "_executeForOperator",
      value: function _executeForOperator(rightSide) {
        if (rightSide instanceof LogicalNotOperator) {
          return null;
        } else {
          throw new Error('Invalid usage of logical not');
        }
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        return !this.resolveSide(rightSide, context);
      }
    }]);

    return LogicalNotOperator;
  }(Abstract1Arg);

  LogicalNotOperator.$pattern = /^!(?!=)/;
  var LogicalNot = LogicalNotOperator;

  var BitwiseNotOperator =
  /*#__PURE__*/
  function (_Abstract1ArgOperator) {
    _inherits(BitwiseNotOperator, _Abstract1ArgOperator);

    function BitwiseNotOperator() {
      _classCallCheck(this, BitwiseNotOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(BitwiseNotOperator).call(this));
    }

    _createClass(BitwiseNotOperator, [{
      key: "_executeForOperator",
      value: function _executeForOperator(rightSide) {
        if (rightSide instanceof BitwiseNotOperator) {
          return null;
        } else {
          throw new Error('Invalid usage of bitwise not');
        }
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        return ~this.resolveSide(rightSide, context);
      }
    }]);

    return BitwiseNotOperator;
  }(Abstract1Arg);

  BitwiseNotOperator.$pattern = /^~/;
  var BitwiseNot = BitwiseNotOperator;

  var TypeofOperator =
  /*#__PURE__*/
  function (_Abstract1ArgOperator) {
    _inherits(TypeofOperator, _Abstract1ArgOperator);

    function TypeofOperator() {
      _classCallCheck(this, TypeofOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(TypeofOperator).call(this));
    }

    _createClass(TypeofOperator, [{
      key: "_executeForOperator",
      value: function _executeForOperator() {
        throw new Error('Invalid usage of typeof');
      }
    }, {
      key: "_executeForConsumer",
      value: function _executeForConsumer(rightSide, context) {
        return _typeof(this.resolveSide(rightSide, context));
      }
    }]);

    return TypeofOperator;
  }(Abstract1Arg);

  TypeofOperator.$pattern = /^typeof(?![A-Za-z0-9$_])/;
  var Typeof = TypeofOperator;

  var MultiplyOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(MultiplyOperator, _Abstract2ArgOperator);

    function MultiplyOperator() {
      _classCallCheck(this, MultiplyOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(MultiplyOperator).call(this));
    }

    _createClass(MultiplyOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) * this.resolveSide(rightSide, context);
      }
    }]);

    return MultiplyOperator;
  }(Abstract2Arg);

  MultiplyOperator.$pattern = /^\*/;
  var Multiply = MultiplyOperator;

  var DivideOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(DivideOperator, _Abstract2ArgOperator);

    function DivideOperator() {
      _classCallCheck(this, DivideOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(DivideOperator).call(this));
    }

    _createClass(DivideOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) / this.resolveSide(rightSide, context);
      }
    }]);

    return DivideOperator;
  }(Abstract2Arg);

  DivideOperator.$pattern = /^\//;
  var Divide = DivideOperator;

  var ModuloOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(ModuloOperator, _Abstract2ArgOperator);

    function ModuloOperator() {
      _classCallCheck(this, ModuloOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(ModuloOperator).call(this));
    }

    _createClass(ModuloOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) % this.resolveSide(rightSide, context);
      }
    }]);

    return ModuloOperator;
  }(Abstract2Arg);

  ModuloOperator.$pattern = /^%/;
  var Modulo = ModuloOperator;

  var PlusOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(PlusOperator, _Abstract2ArgOperator);

    function PlusOperator() {
      _classCallCheck(this, PlusOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(PlusOperator).call(this));
    }

    _createClass(PlusOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) + this.resolveSide(rightSide, context);
      }
    }]);

    return PlusOperator;
  }(Abstract2Arg);

  PlusOperator.$pattern = /^\+/;
  var Plus = PlusOperator;

  var MinusOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(MinusOperator, _Abstract2ArgOperator);

    function MinusOperator() {
      _classCallCheck(this, MinusOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(MinusOperator).call(this));
    }

    _createClass(MinusOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) - this.resolveSide(rightSide, context);
      }
    }]);

    return MinusOperator;
  }(Abstract2Arg);

  MinusOperator.$pattern = /^-/;
  var Minus = MinusOperator;

  var GreaterEqOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(GreaterEqOperator, _Abstract2ArgOperator);

    function GreaterEqOperator() {
      _classCallCheck(this, GreaterEqOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(GreaterEqOperator).call(this));
    }

    _createClass(GreaterEqOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) >= this.resolveSide(rightSide, context);
      }
    }]);

    return GreaterEqOperator;
  }(Abstract2Arg);

  GreaterEqOperator.$pattern = /^>=/;
  var GreaterEq = GreaterEqOperator;

  var LessEqOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(LessEqOperator, _Abstract2ArgOperator);

    function LessEqOperator() {
      _classCallCheck(this, LessEqOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LessEqOperator).call(this));
    }

    _createClass(LessEqOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) <= this.resolveSide(rightSide, context);
      }
    }]);

    return LessEqOperator;
  }(Abstract2Arg);

  LessEqOperator.$pattern = /^<=/;
  var LessEq = LessEqOperator;

  var GreaterOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(GreaterOperator, _Abstract2ArgOperator);

    function GreaterOperator() {
      _classCallCheck(this, GreaterOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(GreaterOperator).call(this));
    }

    _createClass(GreaterOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) > this.resolveSide(rightSide, context);
      }
    }]);

    return GreaterOperator;
  }(Abstract2Arg);

  GreaterOperator.$pattern = /^>/;
  var Greater = GreaterOperator;

  var LessOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(LessOperator, _Abstract2ArgOperator);

    function LessOperator() {
      _classCallCheck(this, LessOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LessOperator).call(this));
    }

    _createClass(LessOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) < this.resolveSide(rightSide, context);
      }
    }]);

    return LessOperator;
  }(Abstract2Arg);

  LessOperator.$pattern = /^</;
  var Less = LessOperator;

  var InstanceofOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(InstanceofOperator, _Abstract2ArgOperator);

    function InstanceofOperator() {
      _classCallCheck(this, InstanceofOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(InstanceofOperator).call(this));
    }

    _createClass(InstanceofOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) instanceof this.resolveSide(rightSide, context);
      }
    }]);

    return InstanceofOperator;
  }(Abstract2Arg);

  InstanceofOperator.$pattern = /^instanceof/;
  var Instanceof = InstanceofOperator;

  var InOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(InOperator, _Abstract2ArgOperator);

    function InOperator() {
      _classCallCheck(this, InOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(InOperator).call(this));
    }

    _createClass(InOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) in this.resolveSide(rightSide, context);
      }
    }]);

    return InOperator;
  }(Abstract2Arg);

  InOperator.$pattern = /^in/;
  var In = InOperator;

  var IdentityOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(IdentityOperator, _Abstract2ArgOperator);

    function IdentityOperator() {
      _classCallCheck(this, IdentityOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(IdentityOperator).call(this));
    }

    _createClass(IdentityOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) === this.resolveSide(rightSide, context);
      }
    }]);

    return IdentityOperator;
  }(Abstract2Arg);

  IdentityOperator.$pattern = /^===/;
  var Identity = IdentityOperator;

  var NonidentityOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(NonidentityOperator, _Abstract2ArgOperator);

    function NonidentityOperator() {
      _classCallCheck(this, NonidentityOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(NonidentityOperator).call(this));
    }

    _createClass(NonidentityOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) !== this.resolveSide(rightSide, context);
      }
    }]);

    return NonidentityOperator;
  }(Abstract2Arg);

  NonidentityOperator.$pattern = /^!==/;
  var Nonidentity = NonidentityOperator;

  var EqualityOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(EqualityOperator, _Abstract2ArgOperator);

    function EqualityOperator() {
      _classCallCheck(this, EqualityOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(EqualityOperator).call(this));
    }

    _createClass(EqualityOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) == this.resolveSide(rightSide, context);
      }
    }]);

    return EqualityOperator;
  }(Abstract2Arg);

  EqualityOperator.$pattern = /^==/;
  var Equality = EqualityOperator;

  var InequalityOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(InequalityOperator, _Abstract2ArgOperator);

    function InequalityOperator() {
      _classCallCheck(this, InequalityOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(InequalityOperator).call(this));
    }

    _createClass(InequalityOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) != this.resolveSide(rightSide, context);
      }
    }]);

    return InequalityOperator;
  }(Abstract2Arg);

  InequalityOperator.$pattern = /^!=/;
  var Inequality = InequalityOperator;

  var LogicalAndOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(LogicalAndOperator, _Abstract2ArgOperator);

    function LogicalAndOperator() {
      _classCallCheck(this, LogicalAndOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LogicalAndOperator).call(this));
    }

    _createClass(LogicalAndOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) && this.resolveSide(rightSide, context);
      }
    }]);

    return LogicalAndOperator;
  }(Abstract2Arg);

  LogicalAndOperator.$pattern = /^&&/;
  var LogicalAnd = LogicalAndOperator;

  var LogicalOrOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(LogicalOrOperator, _Abstract2ArgOperator);

    function LogicalOrOperator() {
      _classCallCheck(this, LogicalOrOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(LogicalOrOperator).call(this));
    }

    _createClass(LogicalOrOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) || this.resolveSide(rightSide, context);
      }
    }]);

    return LogicalOrOperator;
  }(Abstract2Arg);

  LogicalOrOperator.$pattern = /^\|\|/;
  var LogicalOr = LogicalOrOperator;

  var BitwiseAndOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(BitwiseAndOperator, _Abstract2ArgOperator);

    function BitwiseAndOperator() {
      _classCallCheck(this, BitwiseAndOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(BitwiseAndOperator).call(this));
    }

    _createClass(BitwiseAndOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) & this.resolveSide(rightSide, context);
      }
    }]);

    return BitwiseAndOperator;
  }(Abstract2Arg);

  BitwiseAndOperator.$pattern = /^&/;
  var BitwiseAnd = BitwiseAndOperator;

  var BitwiseOrOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(BitwiseOrOperator, _Abstract2ArgOperator);

    function BitwiseOrOperator() {
      _classCallCheck(this, BitwiseOrOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(BitwiseOrOperator).call(this));
    }

    _createClass(BitwiseOrOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) | this.resolveSide(rightSide, context);
      }
    }]);

    return BitwiseOrOperator;
  }(Abstract2Arg);

  BitwiseOrOperator.$pattern = /^\|/;
  var BitwiseOr = BitwiseOrOperator;

  var BitwiseXorOperator =
  /*#__PURE__*/
  function (_Abstract2ArgOperator) {
    _inherits(BitwiseXorOperator, _Abstract2ArgOperator);

    function BitwiseXorOperator() {
      _classCallCheck(this, BitwiseXorOperator);

      return _possibleConstructorReturn(this, _getPrototypeOf(BitwiseXorOperator).call(this));
    }

    _createClass(BitwiseXorOperator, [{
      key: "_execute",
      value: function _execute(leftSide, rightSide, context) {
        return this.resolveSide(leftSide, context) ^ this.resolveSide(rightSide, context);
      }
    }]);

    return BitwiseXorOperator;
  }(Abstract2Arg);

  BitwiseXorOperator.$pattern = /^\^/;
  var BitwiseXor = BitwiseXorOperator;

  var index$1 = [MemberAccess, LogicalNot, BitwiseNot, Unary.Plus, Unary.Negation, Typeof, Multiply, Divide, Modulo, Plus, Minus, GreaterEq, LessEq, Greater, Less, Instanceof, In, Identity, Nonidentity, Equality, Inequality, LogicalAnd, LogicalOr, BitwiseAnd, BitwiseOr, BitwiseXor, Conditional.Start, Conditional.End]; // set priority

  for (var i = 0; i < index$1.length; i++) {
    index$1[i].$priority = index$1.length - i;
  }
  /**
   * Check is given something is an Operator
   * @param {*} sth
   * @returns {boolean}
   */


  function isOperator(sth) {
    return sth instanceof Abstract$1;
  }
  /**
   * Find proper Operator
   * @param {string} str
   * @param {number} isLastEntityConsumer
   * @returns {AbstractOperator}
   */


  function find$1(str, isLastEntityConsumer) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = index$1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entity = _step.value;

        if (entity.$pattern.test(str) && (!entity.$prevMustBeConsumer && !isLastEntityConsumer || !entity.$prevMustntBeConsumer && isLastEntityConsumer)) {
          return entity;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return null;
  }

  var operators = {
    find: find$1,
    isOperator: isOperator
  };

  var whiteChar = /\s/;
  var groupOpening = /\(/;
  var groupClosing = /\)/;

  var Evaluation =
  /*#__PURE__*/
  function () {
    /**
     * Evaluation of expression in given context
     *
     * @constructor
     * @param {String} expression
     * @param {Object} context
     */

    /**
    * Evaluation of subexpression
    *
    * @constructor
    * @param {Evaluation} parent
    */
    function Evaluation(arg0, context) {
      _classCallCheck(this, Evaluation);

      if (arg0 instanceof Evaluation) {
        this.parent = arg0;
      } else {
        if (typeof arg0 !== 'string') {
          throw new TypeError('expression is not a String');
        }

        if (_typeof(context) !== 'object' || context === null) {
          throw new TypeError('expression is not an Object');
        }

        this.parent = null;
        this._expression = arg0;
        this._context = context;
        this._idx = 0;
      }
    }
    /**
     * Expression Getter
     */


    _createClass(Evaluation, [{
      key: "run",

      /**
       * Run Evaluation
       */
      value: function run() {
        this.entities = [];
        this.readExpression();
        return this.execute();
      }
      /**
       * Parse Expression
       * This is the first step. It will read expression and extract entities, which will be executed.
       * Reading also should validate syntax.
       */

    }, {
      key: "readExpression",
      value: function readExpression() {
        this.currentEntity = null;

        var _char, response, Entity;

        for (this.idx; this.idx < this.expression.length; this.idx++) {
          _char = this.expression[this.idx]; // check if there is an entity

          if (this.currentEntity == null) {
            // just skip if it's white char
            if (whiteChar.test(_char)) {
              continue; // evaluate group if it's opening
            } else if (groupOpening.test(_char)) {
              this.evaluateGroup();
              continue; // closing group?
            } else if (groupClosing.test(_char)) {
              // is this even a sub-evaluation?
              if (this.parent == null) {
                throw new Error('Unexpected group closing char');
              } else {
                this.idx++;
                break;
              }
            } // if not then find one


            Entity = this.findEntity();

            if (Entity == null) {
              throw new Error("Unexpected char ".concat(_char, " at index ").concat(this.idx));
            } else {
              this.currentEntity = new Entity();
            }
          } // get response from the entity


          response = this.currentEntity.take(_char);

          if (response === TakeResponseEnum.OK_CONTENTED) {
            this.resolveEntity();
          } else if (response === TakeResponseEnum.REJECT) {
            this.resolveEntity();
            --this.idx;
          }
        }

        if (this.currentEntity != null) {
          this.resolveEntity();
        }
      }
      /**
       * Execute
       * This is the second step. Now that we have list of entities and syntax is validated, we can execute it with
       * proper order.
       */

    }, {
      key: "execute",
      value: function execute() {
        while (this.entities.length > 1) {
          // 1. Get the most important operator
          var current = {
            priority: 0,
            index: -1
          };

          for (var i = 0; i < this.entities.length; i++) {
            if (operators.isOperator(this.entities[i])) {
              var priority = this.entities[i].$priority;

              if (current.priority < priority) {
                current.priority = priority;
                current.index = i;
              }
            }
          } // 2. Execute operator


          this.entities[current.index].execute(this.context, current.index, this.entities);
        }

        if (consumers.isConsumer(this.entities[0])) {
          this.entities[0] = this.entities[0].resolve(this.context);
        }

        return this.entities[0];
      }
      /**
       * Find an Entity that wants this char
       * @returns {AbstractEntity|null}
       */

    }, {
      key: "findEntity",
      value: function findEntity() {
        var str = this.expression.substr(this.idx);
        var Entity = operators.find(str, this.isLastEntityConsumer);

        if (Entity == null) {
          Entity = consumers.find(str);
        }

        return Entity;
      }
      /**
       * Resolve the Entity
       */

    }, {
      key: "resolveEntity",
      value: function resolveEntity() {
        this.entities.push(this.currentEntity);
        this.currentEntity = null;
      }
      /**
       * Check if last entity is a Consumer
       */

    }, {
      key: "evaluateGroup",

      /**
       * Evaluate the Group
       */
      value: function evaluateGroup() {
        this.idx++;
        this.currentEntity = new Evaluation(this).run();
        this.resolveEntity();
      }
    }, {
      key: "expression",
      get: function get() {
        return this.parent == null ? this._expression : this.parent._expression;
      }
      /**
       * Context Getter
       */

    }, {
      key: "context",
      get: function get() {
        return this.parent == null ? this._context : this.parent._context;
      }
      /**
       * Current Index Getter
       */

    }, {
      key: "idx",
      get: function get() {
        return this.parent == null ? this._idx : this.parent._idx;
      }
      /**
       * Current Index Setter
       */
      ,
      set: function set(val) {
        if (this.parent == null) {
          this._idx = val;
        } else {
          this.parent._idx = val;
        }
      }
    }, {
      key: "isLastEntityConsumer",
      get: function get() {
        return this.entities.length > 0 ? !operators.isOperator(this.entities[this.entities.length - 1]) : false;
      }
    }]);

    return Evaluation;
  }();

  var Evaluation_1 = Evaluation;

  /**
   * meval
   * @param {String} expression Expression to be parsed
   * @param {Object} context Context for expression
   */

  function meval(expression) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Evaluation_1(expression, context).run();
  }

  var src = meval;

  return src;

})));
