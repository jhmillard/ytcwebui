

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.sendInvoiceEmailNotification = sendInvoiceEmailNotification;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _apiInvoiceInvoiceModel = require('../../api/invoice/invoice.model');

var _apiInvoiceInvoiceModel2 = _interopRequireDefault(_apiInvoiceInvoiceModel);

var moment = require('moment');
var nodemailer = require('nodemailer');

//now we are going to try to create our interval timer here.
setInterval(function () {

  _apiInvoiceInvoiceModel2['default'].findAsync({ status: 'sent' }).then(function (response) {

    var expiredInvoices = [];
    for (var i = 0; i < response.length; i++) {
      var invoice = new _apiInvoiceInvoiceModel2['default']();
      invoice = response[i];

      var current_date = moment().format('MM/DD/YYYY');
      var start_date = moment(current_date, 'MM/DD/YYYY');
      var end_date = moment(invoice.date, 'MM/DD/YYYY');
      var day_diff = start_date.diff(end_date, 'days');

      if (day_diff > 30) {
        //at this point we need to push the current invoice into the expired array
        expiredInvoices.push(invoice);
      }

      console.log("found invoice/date/formatted date: " + invoice.name + " / " + invoice.date + "-" + current_date);
      console.log("start date: " + start_date);
      console.log("end date: " + end_date);
      console.log("Date difference in days: " + day_diff);
      sendInvoiceEmailNotification(expiredInvoices);
    }
  })['catch'](function () {
    console.log("An error occured");
  });

  //now we will select the invoices where status = 'entered';

  console.log("current month: " + moment().format('MM/DD/YYYY'));

  console.log("Current Time-" + new Date());
}, 1000 * 60 * 60 * 24);

function sendInvoiceEmailNotification(expiredInvoices) {

  //  This is where we will format and send an email/text to configured users.
}
//# sourceMappingURL=interval.js.map
