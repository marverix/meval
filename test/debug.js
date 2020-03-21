const meval = require('../src');

var x = meval('(item.fromTime == null || item.fromTime <= Date.now()) && (item.toTime == null || item.toTime > Date.now())', {
  item: {
    fromTime: null,
    toTime: 1584794436402
  }
});
console.log(x);
