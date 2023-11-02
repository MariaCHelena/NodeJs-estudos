const _ = require('lodash');

const a = [1, 2, 3, 4]
const b = [3, 4, 5, 6]

const diff = _.difference(a, b)
console.log(diff)