// Prepare chai
const chai = require('chai');
const expect = chai.expect;
const meval = require('../dist/meval.min');

describe('meval', function() {

  const testContext = {
    str: 'Hello World',
    item: {
      a: 2,
      b: 3,
      c: '2',
      deep: {
        deeper: {
          found: 'gold'
        }
      }
    },
    condition: true
  };

  describe('Test basic accessor', function() {
    it('Should return "Hello World"', function() {
      var ret = meval('str', testContext);
      expect(ret).to.be.eq('Hello World');
    });
  });

  describe('Test nested accessor', function() {
    it('Should return 2', function() {
      var ret = meval('item.a', testContext);
      expect(ret).to.be.eq(2);
    });

    it('Should return "gold"', function() {
      var ret = meval('item.deep.deeper.found', testContext);
      expect(ret).to.be.eq('gold');
    });
  });

  describe('Test strings', function() {
    it('Should return "Test"', function() {
      var ret = meval('"Test"', testContext);
      expect(ret).to.be.eq('Test');
    });
  });

  describe('Test numbers', function() {
    it('Should return 123', function() {
      var ret = meval('123', testContext);
      expect(ret).to.be.eq(123);
    });

    it('Should return 1.23', function() {
      var ret = meval('1.23', testContext);
      expect(ret).to.be.eq(1.23);
    });
  });

  describe('Test booleans', function() {
    it('Should return true', function() {
      var ret = meval('true', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('false', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test global properties', function() {
    it('Should return undefined', function() {
      var ret = meval('undefined', testContext);
      expect(ret).to.be.an.undefined;
    });

    it('Should return null', function() {
      var ret = meval('null', testContext);
      expect(ret).to.be.an.null;
    });

    it('Should return NaN', function() {
      var ret = meval('NaN', testContext);
      expect(ret).to.be.a.NaN;
    });

    it('Should return Infinity', function() {
      var ret = meval('Infinity', testContext);
      expect(ret).to.be.eq(Infinity);
    });
  });

  describe('Test using method', function() {
    it('Should return "HELLO WORLD"', function() {
      var ret = meval('str.toUpperCase()', testContext);
      expect(ret).to.be.eq('HELLO WORLD');
    });
  });

  describe('Test 1 argument operator: !', function() {
    it('Should return true', function() {
      var ret = meval('!false', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('!true', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('!condition', testContext);
      expect(ret).to.be.false;
    });

    it('Should return true', function() {
      var ret = meval('!item.condition', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test 1 argument operator: typeof', function() {
    it('Should return "undefined"', function() {
      var ret = meval('typeof item.x', testContext);
      expect(ret).to.be.eq('undefined');
    });

    it('Should return "undefined"', function() {
      var ret = meval('typeof undefined', testContext);
      expect(ret).to.be.eq('undefined');
    });

    it('Should return "string"', function() {
      var ret = meval('typeof str', testContext);
      expect(ret).to.be.eq('string');
    });

    it('Should return "string"', function() {
      var ret = meval('typeof "test"', testContext);
      expect(ret).to.be.eq('string');
    });

    it('Should return "number"', function() {
      var ret = meval('typeof item.a', testContext);
      expect(ret).to.be.eq('number');
    });

    it('Should return "number"', function() {
      var ret = meval('typeof 1.23', testContext);
      expect(ret).to.be.eq('number');
    });

    it('Should return "number"', function() {
      var ret = meval('typeof NaN', testContext);
      expect(ret).to.be.eq('number');
    });

    it('Should return "number"', function() {
      var ret = meval('typeof Infinity', testContext);
      expect(ret).to.be.eq('number');
    });

    it('Should return "boolean"', function() {
      var ret = meval('typeof condition', testContext);
      expect(ret).to.be.eq('boolean');
    });

    it('Should return "boolean"', function() {
      var ret = meval('typeof true', testContext);
      expect(ret).to.be.eq('boolean');
    });

    it('Should return "object"', function() {
      var ret = meval('typeof item.deep', testContext);
      expect(ret).to.be.eq('object');
    });

    it('Should return "object"', function() {
      var ret = meval('typeof null', testContext);
      expect(ret).to.be.eq('object');
    });
  });

  describe('Test 2 argument operator: *', function() {
    it('Should return 6', function() {
      var ret = meval('item.a * item.b', testContext);
      expect(ret).to.be.eq(6);
    });
  });

  describe('Test 2 argument operator: /', function() {
    it('Should return 1.5', function() {
      var ret = meval('item.b / item.a', testContext);
      expect(ret).to.be.eq(1.5);
    });
  });

  describe('Test 2 argument operator: %', function() {
    it('Should return 2', function() {
      var ret = meval('item.a % item.b', testContext);
      expect(ret).to.be.eq(2);
    });

    it('Should return 1', function() {
      var ret = meval('item.b % item.a', testContext);
      expect(ret).to.be.eq(1);
    });
  });

  describe('Test 2 argument operator: +', function() {
    it('Should return 5', function() {
      var ret = meval('item.a + item.b', testContext);
      expect(ret).to.be.eq(5);
    });
  });

  describe('Test 2 argument operator: -', function() {
    it('Should return -1', function() {
      var ret = meval('item.a - item.b', testContext);
      expect(ret).to.be.eq(-1);
    });

    it('Should return 1', function() {
      var ret = meval('item.b - item.a', testContext);
      expect(ret).to.be.eq(1);
    });
  });

  describe('Test 2 argument operator: >=', function() {
    it('Should return false', function() {
      var ret = meval('item.a >= item.b', testContext);
      expect(ret).to.be.false;
    });

    it('Should return true', function() {
      var ret = meval('item.b >= item.a', testContext);
      expect(ret).to.be.true;
    });

    it('Should return true', function() {
      var ret = meval('item.a >= 2', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test 2 argument operator: <=', function() {
    it('Should return true', function() {
      var ret = meval('item.a <= item.b', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('item.b <= item.a', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('item.a <= 1', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 2 argument operator: >', function() {
    it('Should return false', function() {
      var ret = meval('item.a > item.b', testContext);
      expect(ret).to.be.false;
    });

    it('Should return true', function() {
      var ret = meval('item.b > item.a', testContext);
      expect(ret).to.be.true;
    });

    it('Should return true', function() {
      var ret = meval('item.a > 1', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test 2 argument operator: <', function() {
    it('Should return true', function() {
      var ret = meval('item.a < item.b', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('item.b < item.a', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('item.a < 1', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 2 argument operator: ===', function() {
    it('Should return false', function() {
      var ret = meval('item.a === item.c', testContext);
      expect(ret).to.be.false;
    });

    it('Should return true', function() {
      var ret = meval('item.a === 2', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test 2 argument operator: !==', function() {
    it('Should return true', function() {
      var ret = meval('item.a !== item.c', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('item.a !== 2', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 2 argument operator: ==', function() {
    it('Should return true', function() {
      var ret = meval('item.a == item.c', testContext);
      expect(ret).to.be.true;
    });

    it('Should return true', function() {
      var ret = meval('item.a == 2', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test 2 argument operator: !=', function() {
    it('Should return false', function() {
      var ret = meval('item.a != item.c', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('item.a != 2', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 2 argument operator: &&', function() {
    it('Should return true', function() {
      var ret = meval('true && true', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('true && false', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('false && true', testContext);
      expect(ret).to.be.false;
    });

    it('Should return false', function() {
      var ret = meval('false && false', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 2 argument operator: ||', function() {
    it('Should return true', function() {
      var ret = meval('true || true', testContext);
      expect(ret).to.be.true;
    });

    it('Should return true', function() {
      var ret = meval('true || false', testContext);
      expect(ret).to.be.true;
    });

    it('Should return true', function() {
      var ret = meval('false || true', testContext);
      expect(ret).to.be.true;
    });

    it('Should return false', function() {
      var ret = meval('false || false', testContext);
      expect(ret).to.be.false;
    });

    it('Should return true and should not check right side', function() {
      var ret = meval('condition || item.x.notExisting', testContext);
      expect(ret).to.be.true;
    });
  });

  describe('Test mixing 2 argument operators', function() {
    it('Should return 17', function() {
      var ret = meval('item.a + item.b * 5', testContext);
      expect(ret).to.be.eq(17);
    });

    it('Should return 1', function() {
      var ret = meval('2.5 - item.b / item.a', testContext);
      expect(ret).to.be.eq(1);
    });

    it('Should return false', function() {
      var ret = meval('2.5 - item.b / item.a > item.a + item.b * 5', testContext);
      expect(ret).to.be.false;
    });
  });

  describe('Test 3 argument operator', function() {
    it('Should return "Prawda"', function() {
      var ret = meval('condition ? "Prawda" : "Falsz"', testContext);
      expect(ret).to.be.eq('Prawda');
    });

    it('Should return "Mniejsze"', function() {
      var ret = meval('item.a * item.b > 10 ? "Wieksze" : "Mniejsze"', testContext);
      expect(ret).to.be.eq('Mniejsze');
    });
  });

  describe('Test calling methods', function() {
    it('Should return "HELLO WORLD"', function() {
      var ret = meval('str.toUpperCase()', testContext);
      expect(ret).to.be.eq('HELLO WORLD');
    });

    it('Should return current timestamp', function() {
      var ret = meval('Date.now()', testContext);
      expect(ret).to.be.gt(1000);
    });

    it('Should return true', function() {
      var ret = meval('Number.isInteger(item.a)', testContext);
      expect(ret).to.be.true;
    });

    it('Should return 2', function() {
      var ret = meval('Math.min(item.a, item.b)', testContext);
      expect(ret).to.be.eq(2);
    });
  });

});
