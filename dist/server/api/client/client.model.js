'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ClientSchema = new mongoose.Schema({
  name: String,
  info: String,
  addr1: String,
  addr2: String,
  city: String,
  state: String,
  zip: String,
  rate: Number,
  contact: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  active: Boolean
});

exports['default'] = mongoose.model('Client', ClientSchema);
module.exports = exports['default'];
//# sourceMappingURL=client.model.js.map
