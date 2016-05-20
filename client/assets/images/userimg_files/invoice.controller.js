
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InvoiceCtrl = function InvoiceCtrl($stateParams, $state, Invoice) {
  var _this = this;

  _classCallCheck(this, InvoiceCtrl);

  this.viewInvoices = [];
  this.currentInvoices = [];

  this.iterator = 0;

  this.currentInvoices = Invoice.query({}, function () {
    //now we can iterate through the current invoices and setup our actual list JSON to be
    //used by the screen for viewing the totals and such on each invoice
    angular.forEach(_this.currentInvoices, function (value, key) {

      var invoiceLine = {};
      var development_hours = 0;
      var admin_hours = 0;
      var test_hours = 0;
      var total_hours = 0;
      var revenue = 0;
      var currentInvoice = _this.currentInvoices[key];

      //build our timesheet data
      invoiceLine.invoice_id = currentInvoice._id;
      invoiceLine.name = _this.currentInvoices[key].name;
      invoiceLine.poid = _this.currentInvoices[key].po.poid;
      invoiceLine.date = _this.currentInvoices[key].date;
      invoiceLine.status = _this.currentInvoices[key].status;

      angular.forEach(currentInvoice.timesheets, function (sheet, idx) {
        //this is where we total the
        if (currentInvoice.timesheets[idx].category == "dev") {
          development_hours += currentInvoice.timesheets[idx].hours;
        }
        if (currentInvoice.timesheets[idx].category == "admin") {
          admin_hours += currentInvoice.timesheets[idx].hours;
        }
        if (currentInvoice.timesheets[idx].category == "test") {
          test_hours += currentInvoice.timesheets[idx].hours;
        }

        revenue += currentInvoice.timesheets[idx].client_revenue;
      });

      //total_hours = (development_hours + admin_hours + test_hours);

      invoiceLine.dev_hours = development_hours;
      invoiceLine.admin_hours = admin_hours;
      invoiceLine.test_hours = test_hours;
      invoiceLine.total_hours = development_hours + admin_hours + test_hours;
      invoiceLine.revenue = revenue;

      _this.viewInvoices.push(invoiceLine);
    });
  });
};

angular.module('ytcwebUirouteApp').controller('InvoiceCtrl', InvoiceCtrl);
//# sourceMappingURL=invoice.controller.js.map
