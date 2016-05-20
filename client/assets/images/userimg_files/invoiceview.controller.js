'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var InvoiceViewCtrl = (function () {
  function InvoiceViewCtrl($stateParams, $state, Invoice) {
    _classCallCheck(this, InvoiceViewCtrl);

    this.invoice_id = $stateParams.invoice;
    this.showList = false;
    this.Invoice = Invoice;
    this.show_delete_invoice = false;
    this.loadData();
  }

  _createClass(InvoiceViewCtrl, [{
    key: 'loadData',
    value: function loadData() {
      var _this = this;

      this.currentInvoice = this.Invoice.get({ id: this.invoice_id }, function () {
        //do the rest of the stuff here.
        if (_this.currentInvoice.status == "entered") {
          _this.showList = true;

          _this.timesheet_length = _this.currentInvoice.timesheets.length;
          if (_this.timesheet_length == 0) {
            _this.show_delete_invoice = true;
          }
        }
      });
    }
  }, {
    key: 'remove',
    value: function remove(time) {
      var _this2 = this;

      var removal = {};
      removal.timesheet_id = time.id;
      removal.user_id = time.user_id;
      removal.invoice_id = this.currentInvoice._id;
      alert(removal.timesheet_id);
      this.Invoice.removetime(removal, function () {
        _this2.loadData();
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      window.history.back();
    }
  }, {
    key: 'delete',
    value: function _delete(invoice) {
      invoice.$remove({ id: invoice._id });
      window.history.back();
    }
  }]);

  return InvoiceViewCtrl;
})();

angular.module('ytcwebUirouteApp').controller('InvoiceViewCtrl', InvoiceViewCtrl);
//# sourceMappingURL=invoiceview.controller.js.map
