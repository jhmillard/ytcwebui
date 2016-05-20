'use strict';

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

export default mongoose.model('Vendor', VendorSchema);
