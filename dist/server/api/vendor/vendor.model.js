'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VendorSchema = new mongoose.Schema({
  name: String,
  info: String,
  addr1: String,
  addr2: String,
  city: String,
  state: String,
  zip: String,
  rate: Number,

  active: Boolean
});

exports['default'] = mongoose.model('Vendor', VendorSchema);
module.exports = exports['default'];
//# sourceMappingURL=vendor.model.js.map
