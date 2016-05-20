'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AdmindashCtrl = (function () {
  function AdmindashCtrl(Auth, $scope, User, PoStatus, UserRole, Invoice) {
    var _this = this;

    _classCallCheck(this, AdmindashCtrl);

    this.myvariable = 'TEST';
    this.poUsers = [];
    this.openPos = [];
    this.viewPos = [];
    this.User = User;
    this.PoStatus = PoStatus;
    this.UserRole = UserRole;
    this.Invoice = Invoice;
    this.currentInvoices = [];
    this.viewInvoices = [];

    this.setPoData();
    this.currentInvoices = this.Invoice.querystatus({ status: 'entered' }, function () {
      //now we build our list for invoices.
      _this.setInvoiceData(_this.currentInvoices);
    });
  }

  _createClass(AdmindashCtrl, [{
    key: 'setPoData',
    value: function setPoData() {
      var _this2 = this;

      //BEGIN - BLOCK GET OPEN POS
      this.openPos = this.PoStatus.get({ status: 'open' }, function () {
        //need to get all of the users who's PO's are connected here...
        //BEGIN - BLOCK QUERY CURRENT USERS

        _this2.currentUsers = _this2.UserRole.query({ role: "contractor" }, function () {

          //BEGIN - BLOCK OPEN POS
          angular.forEach(_this2.openPos, function (value, key) {
            var poLine = {};
            poLine.dev_hours = 0;
            poLine.admin_hours = 0;
            poLine.test_hours = 0;
            poLine.total_hours = 0;
            poLine.hours = _this2.openPos[key].hours;
            //for each PO lets go ahead and select the unique
            poLine.poid = _this2.openPos[key].poid;
            poLine._id = _this2.openPos[key]._id;
            //now we need to iterate through the contractors and then iterate through their timesheets...
            //BEGIN - BLOCK CURRENT USERS
            angular.forEach(_this2.currentUsers, function (cvalue, ckey) {
              if (angular.isDefined(_this2.currentUsers[ckey].timesheets)) {
                //Iterate through the timesheets for this POID
                var currentTimesheets = _this2.currentUsers[ckey].timesheets;
                //BEGIN - BLOCK CURRENT TIMESHEETS FOR USER
                angular.forEach(currentTimesheets, function (tvalue, tkey) {

                  //if the timesheet po matches our current po in hand
                  if (currentTimesheets[tkey].po.id == poLine._id) {
                    //now we need to setup totals for dev/adim/test
                    if (currentTimesheets[tkey].category == "dev") {
                      poLine.dev_hours += currentTimesheets[tkey].hours;
                      poLine.admin_hours += 0;
                      poLine.test_hours += 0;
                    }
                    if (currentTimesheets[tkey].category == "admin") {
                      poLine.admin_hours += currentTimesheets[tkey].hours;
                      poLine.dev_hours += 0;
                      poLine.test_hours += 0;
                    }
                    if (currentTimesheets[tkey].category == "test") {
                      poLine.test_hours += currentTimesheets[tkey].hours;
                      poLine.admin_hours += 0;
                      poLine.dev_hours += 0;
                    }
                  }
                }); //END - BLOCK CURRENT TIMESHEETS FOR USER
              };
            }); //END - BLOCK CURRENT USERS
            poLine.total_hours = poLine.test_hours + poLine.admin_hours + poLine.dev_hours;
            poLine.avail_hours = poLine.hours - poLine.total_hours;
            _this2.viewPos.push(poLine);
          }); //END - BLOCK OPEN POS
        }); //END - BLOCK QUERY CURRENT USERS
      }); //END - BLOCK GET OPEN POS
    }
  }, {
    key: 'setInvoiceData',
    value: function setInvoiceData(invoices) {
      var _this3 = this;

      //this is where we setup the invoice data we need to use!
      //retrieve invoices by status.
      var invRow = {};
      var hours = 0;
      angular.forEach(invoices, function (value, key) {

        invRow.invid = invoices[key].name;
        invRow._id = invoices[key]._id;
        invRow.date = invoices[key].date;
        var timesheets = invoices[key].timesheets;
        angular.forEach(timesheets, function (tvalue, tkey) {
          //we need to total the rows
          hours += timesheets[tkey].hours;
        });
        invRow.hours = hours;
        _this3.viewInvoices.push(invRow);
        hours = 0;
        invRow = {};
      });
    }
  }]);

  return AdmindashCtrl;
})();

;

angular.module('ytcwebUirouteApp').controller('AdmindashCtrl', AdmindashCtrl);
//# sourceMappingURL=admindash.controller.js.map
