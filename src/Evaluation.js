'use strict';

const consumers = require('./consumers');
const operators = require('./operators');

const TakeResponseEnum = require('./common/TakeResponseEnum');

const whiteChar = /\s/;
const groupOpening = /\(/;
const groupClosing = /\)/;
const nextArgument = /,/;


class AbstractEvaluation {

  constructor () {
    this.entities = [];
    this.currentEntity = null;
  }

  /**
   * Run Evaluation
   */
  run () {
    this.readExpression();
    return this.execute();
  }

  /**
   * Parse Expression
   * This is the first step. It will read expression and extract entities, which will be executed.
   * Reading also should validate syntax.
   */
  readExpression () {
    var char, response, Entity;

    for(this.idx; this.idx < this.expression.length; this.idx++) {
      char = this.expression[this.idx];

      // check if there is an entity
      if (this.currentEntity == null) {

        if (this.shouldFinish(char)) {
          break;
        } else if (this.shouldSkip(char)) {
          continue;
        }

        // if not then find one
        Entity = this.findEntity();

        if (Entity == null) {
          throw new Error(`Unexpected char ${char} at index ${this.idx}`);
        } else {
          this.currentEntity = new Entity();
        }

      }

      // get response from the entity
      response = this.currentEntity.take(char);

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
  execute () {
    while (this.entities.length > 1) {
      // 1. Get the most important operator
      let current = {
        priority: 0,
        index: -1
      };

      for (let i = 0; i < this.entities.length; i++) {
        if (operators.isOperator(this.entities[i])) {
          let priority = this.entities[i].$priority;
          if (current.priority < priority) {
            current.priority = priority;
            current.index = i;
          }
        }
      }

      // 2. Execute operator
      this.entities[current.index].execute(this.context, current.index, this.entities);
    }

    // Lonely cosumer left? Oh, let's take care of you...
    if (consumers.isConsumer(this.entities[0])) {
      this.entities[0] = this.entities[0].resolve(this.context);
    }

    return this.entities[0];
  }


  /**
   * Should skip the turn?
   * @param {string} char
   * @return {boolean}
   */
  shouldSkip (char) {
    if (whiteChar.test(char)) {
      return true;

    // evaluate group if it's opening
    } else if (groupOpening.test(char)) {
      this.subEvaluate(this.isLastEntityConsumer);
      return true;
    }

    return false;
  }

  /**
   * Should finish evaluation?
   * @param {string} char
   * @return {boolean}
   */
  // eslint-disable-next-line no-unused-vars
  shouldFinish (char) {
    return false;
  }

  /**
   * Find an Entity that wants this char
   * @returns {AbstractEntity|null}
   */
  findEntity () {
    let str = this.expression.substr(this.idx);

    let Entity = operators.find(str, this.isLastEntityConsumer);

    if (Entity == null) {
      Entity = consumers.find(str);
    }

    return Entity;
  }

  /**
   * Resolve the Entity
   */
  resolveEntity () {
    this.entities.push(this.currentEntity);
    this.currentEntity = null;
  }

  /**
   * Check if last entity is a Consumer
   */
  get isLastEntityConsumer () {
    if (this.entities.length > 0) {
      let lastEntity = this.entities[this.entities.length - 1];
      return lastEntity instanceof operators.FunctionCall ? true : !operators.isOperator(lastEntity);
    } else {
      return false;
    }
  }

  /**
   * Do some class-based evaluation
   */
  subEvaluate (arg = false) {
    let Sub = arg ? ArgEvaluation : SubEvaluation;

    this.idx++;
    this.currentEntity = new Sub(this).run();
    this.resolveEntity();
  }

}



class MainEvaluation extends AbstractEvaluation {

  /**
   * Evaluation of expression in given context
   *
   * @constructor
   * @param {String} expression
   * @param {Object} context
   */
  constructor (expression, context) {
    super();

    if (typeof expression !== 'string') {
      throw new TypeError('expression is not a String');
    }

    if (typeof context !== 'object' || context === null) {
      throw new TypeError('context is not an Object');
    }

    this.expression = expression;
    this.context = context;
    this.idx = 0;
  }

}



class SubEvaluation extends AbstractEvaluation {

  /**
   * Evaluation of sub-expression
   *
   * @constructor
   * @param {AbstractEvaluation} parent
   */
  constructor (parent) {
    super();
    this.parent = parent;
  }

  /**
   * Expression Getter
   */
  get expression () {
    return this.parent.expression;
  }

  /**
   * Context Getter
   */
  get context () {
    return this.parent.context;
  }

  /**
   * Current Index Getter
   */
  get idx () {
    return this.parent.idx;
  }

  /**
   * Current Index Setter
   */
  set idx (val) {
    this.parent.idx = val;
  }

  /**
   * Should finish evaluation?
   * @return {boolean}
   */
  shouldFinish (char) {
    if (groupClosing.test(char) || nextArgument.test(char)) {
      this.idx++;
      return true;
    }
    return false;
  }

}



class ArgEvaluation extends SubEvaluation {

  /**
   * Evaluation of arguments-expression
   *
   * @constructor
   * @param {AbstractEvaluation} parent
   */
  constructor (parent) {
    super(parent);
  }

  /**
   * Should skip the turn?
   * @param {string} char
   * @return {boolean}
   */
  shouldSkip (char) {
    if (super.shouldSkip(char)) {
      return true;
    }

    this.idx--;
    this.subEvaluate(false);
    return true;
  }

  execute () {
    this.idx--;
    return new operators.FunctionCall(this.entities);
  }

}




module.exports = MainEvaluation;
