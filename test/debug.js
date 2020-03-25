const meval = require('../src');

var x = meval('Date.now() - 10 >= 10', {
  item: {
    fromTime: null,
    toTime: 1584794436402
  }
});
console.log(x);
