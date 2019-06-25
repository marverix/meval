// Prepare chai
const chai = require('chai');
const expect = chai.expect;
const meval = require('../dist/meval');

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

  describe('Test using method', function() {
    it('Should return "HELLO WORLD"', function() {
      var ret = meval('str.toUpperCase()', testContext);
      expect(ret).to.be.eq('HELLO WORLD');
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
