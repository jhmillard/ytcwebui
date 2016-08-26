'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var DailySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

exports['default'] = mongoose.model('Daily', DailySchema);
module.exports = exports['default'];
//# sourceMappingURL=daily.model.js.map
