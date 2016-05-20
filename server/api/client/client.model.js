'use strict';

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

export default mongoose.model('Client', ClientSchema);
