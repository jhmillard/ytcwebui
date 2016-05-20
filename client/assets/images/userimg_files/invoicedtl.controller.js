'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var InvoiceDtlCtrl = (function () {
  function InvoiceDtlCtrl($stateParams, $state, PoStatus, Po, User, Invoice, $filter) {
    var _this = this;

    _classCallCheck(this, InvoiceDtlCtrl);

    this.Invoice = Invoice;
    this.$state = $state;
    this.$filter = $filter;
    this.User = User;

    this.date = new Date();
    this.short_date = moment(this.date).format('MM/DD/YYYY');

    this.contractor_rate;
    this.client_rate;
    this.error_string;

    this.timesheets = [];
    this.selected = [];

    this.users = User.query(function () {
      //need to get the list of PO's out there.
      _this.pos = PoStatus.get({ status: "open" }, function () {

        angular.forEach(_this.pos, function (pvalue, pkey) {
          _this.pos[pkey].entered_timesheets = 0;
          //now we need to see how many entered timesheets there are....
        });

        _this.settimesheets();
      });
    });
    if ($stateParams.invoiceid == 0) {
      this.currentinvoice = {};
      this.submit = "Add";
    } else {
      this.currentinvoice = Invoice.get({ id: $stateParams.invoiceid }, function () {
        if (!_this.currentinvoice.date) {
          _this.currentinvoice.date = new Date();
        } else {
          _this.currentinvoice.date = new Date(_this.currentinvoice.date);
        }

        _this.submit = "Update";
      });
    }
  }

  _createClass(InvoiceDtlCtrl, [{
    key: 'cancel',
    value: function cancel(previous) {
      //if(previous){
      //  this.$state.go(previous)
      //}
      //else{
      //  this.$state.go('invoice');
      //}
      window.history.back();
    }
  }, {
    key: 'settimesheets',
    value: function settimesheets() {
      var _this2 = this;

      //this.poUsers = this.$filter('filter')(this.users,{timesheets.po.id: this.currentinvoice.po.id._id});

      //this.timesheetList = this.$filter('filter')(this.currentuser.timesheets,{short_date: moment(time).format('MM/DD/YYYY')});

      if (angular.isDefined(this.currentinvoice.po.client)) {

        this.currentClient = this.User.get({ id: this.currentinvoice.po.client }, function () {

          _this2.timesheets = [];
          _this2.selected = [];

          var time_row = {};

          angular.forEach(_this2.users, function (value, key) {

            var currentUser = _this2.users[key];
            if (angular.isDefined(currentUser.timesheets)) {
              angular.forEach(currentUser.timesheets, function (sheet, idx) {
                if (angular.isDefined(currentUser.timesheets[idx].po.id)) {
                  if (currentUser.timesheets[idx].po.id == _this2.currentinvoice.po._id && currentUser.timesheets[idx].status == 'entered') {

                    var cost = parseInt(currentUser.timesheets[idx].hours) * parseInt(currentUser.contractor_rate);
                    var cl_rev = parseInt(currentUser.timesheets[idx].hours) * parseInt(_this2.currentClient.client_rate);

                    time_row = {

                      short_date: currentUser.timesheets[idx].short_date,
                      name: currentUser.timesheets[idx].po.name,
                      id: currentUser.timesheets[idx]._id,
                      user_id: currentUser._id,
                      hours: currentUser.timesheets[idx].hours,
                      rate: currentUser.contractor_rate,
                      desc: currentUser.timesheets[idx].desc,
                      contractor_name: currentUser.last_name,
                      contractor_cost: cost,
                      client_revenue: cl_rev,
                      my_revenue: cl_rev - cost,
                      category: currentUser.timesheets[idx].category

                    };

                    _this2.timesheets.push(time_row);
                    time_row = {};
                  }
                }
              });
            }
          });
        });
      } else {
        this.timesheets = [];
      }
    }
  }, {
    key: 'check_error',
    value: function check_error() {
      if (this.selected.length > 0) {
        this.error_string = "";
      }
    }
  }, {
    key: 'register',
    value: function register(form, previous) {
      var _this3 = this;

      this.submitted = true;

      this.currentinvoice.timesheets = this.selected;
      this.currentinvoice.date = this.short_date;
      if (form.$valid) {

        if (this.submit == "Update") {
          this.Invoice.update(this.currentinvoice, function () {
            _this3.$state.go('invoice');
          });
        } else {
          if (this.selected.length == 0) {
            this.error_string = "Must Select atleast ONE timesheet";
          } else {
            this.Invoice.save(this.currentinvoice, function () {
              //this.$state.go('invoice');
              window.history.back();
            });
          }
        }
      }
    }
  }]);

  return InvoiceDtlCtrl;
})();

angular.module('ytcwebUirouteApp').controller('InvoiceDtlCtrl', InvoiceDtlCtrl).filter('sumByKey', function () {
  return function (data, key) {
    if (typeof data === 'undefined' || typeof key === 'undefined') {
      return 0;
    }

    var sum = 0;
    for (var i = data.length - 1; i >= 0; i--) {
      sum += parseInt(data[i][key]);
    }

    return sum;
  };
});
//# sourceMappingURL=invoicedtl.controller.js.map
