'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PoMilestones = new mongoose.Schema({

  title: String,
  desc: String,
  progress: {
    type: Number,
    default: 0
  },
  hours: Number,
  contractor:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }

})

var PoSchema = new mongoose.Schema({
  poid: String,
  podesc: String,
  hours: Number,
  hours_used:{
    type: Number,
    default: 0
  },
  hours_invoiced: Number,
  hours_paid: Number,
  client: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  project: String,
  date: String,
  pssa: String,
  contact: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  contractor: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  info: String,
  status: { type: String, default: 'open'},
  milestones:[PoMilestones],
  active: Boolean
});

export default mongoose.model('Po', PoSchema);
