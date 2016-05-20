'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var InvoiceTimeSchema = new mongoose.Schema({

  short_date: String,
  name: String,
  id:{
    type: mongoose.Schema.Types.ObjectId, re:'TimeSheetSchema'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, re: 'UserSchema'
  },
  hours: Number,
  rate: Number,
  desc: String,
  contractor_name: String,
  contractor_cost: Number,
  client_revenue: Number,
  my_revenue: Number,
  category: String

})

var InvoiceSchema = new mongoose.Schema({
  name: String,
  info: String,
  date: String,
  po:{
    _id:{
      type: mongoose.Schema.Types.ObjectId, ref: 'Po'},
    poid: String
  },
  timesheets:[InvoiceTimeSchema],
  status:{
    type: String,
    default: "entered"
  },
  dtimemod: String,
  active: Boolean
});

export default mongoose.model('Invoice', InvoiceSchema);
