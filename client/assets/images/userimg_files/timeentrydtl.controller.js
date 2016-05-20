'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeentryDetailCtrl = (function () {
  function TimeentryDetailCtrl($state, PoContractor, PoHoursUsed, User, $filter, $stateParams) {
    var _this = this;

    _classCallCheck(this, TimeentryDetailCtrl);

    this.$state = $state;
    this.updateForm = true;
    this.validTime = false;
    this.updateIndex = 0;
    this.userid = $stateParams.userid;
    this.User = User;
    this.hoursUsed = PoHoursUsed;
    this.$filter = $filter;
    this.categories = [];
    this.submitbutton = "Add";
    this.allowDelete = false;

    this.poupdate = {
      _id: 0,
      hours: 0
    };

    this.timesheet = {
      skillset: {
        code: {
          cplus: false,
          javascript: false,
          csharp: false,
          plsql: false,
          java: false
        },
        db: {
          oracle: false,
          sqlserver: false,
          mysql: false,
          mongo: false
        },
        leadership: {
          management: false,
          training: false
        }
      }
    };

    this.currentuser = User.get({ id: $stateParams.userid }, function () {

      if ($stateParams.timesheetid == 0) {
        //this is an insert scenario
        _this.updateForm = false;
        _this.validTime = true;
      } else {
        _this.submitbutton = "Update";
        _this.timesheetidx = 0;
        _this.allowDelete = true;
        //we need to iterate through our timesheets to find the one for our ID.

        angular.forEach(_this.currentuser.timesheets, function (value, key) {
          if (_this.currentuser.timesheets[key]._id == $stateParams.timesheetid) {
            _this.validTime = true;
            _this.timesheet = _this.currentuser.timesheets[key];
            _this.timesheet.date = new Date(_this.currentuser.timesheets[key].date);
            _this.setcategories(_this.timesheet.date, _this.timesheet.category, _this.timesheet.po._id);
            _this.timesheetidx = key;
            //this.timesheet.category = this.currentuser.timesheets[key].category;
          }
        });
      }

      _this.contractorpos = PoContractor.get({ contractor: _this.currentuser._id });
    });

    this.status = [{
      type: 'entered',
      desc: 'Entered'
    }, {
      type: 'invoiced',
      desc: 'Invoiced'
    }, {
      type: 'received',
      desc: 'Received'
    }, {
      type: 'paid',
      desc: 'Paid'
    }];
  }

  _createClass(TimeentryDetailCtrl, [{
    key: "removeTimesheet",
    value: function removeTimesheet() {
      var _this2 = this;

      this.currentuser.timesheets.splice(this.timesheetidx, 1);
      //now do an update on current user.
      this.User.update(this.currentuser, function () {
        _this2.$state.go('timeentry');
      });
    }
  }, {
    key: "setcategories",
    value: function setcategories(time, updatecat, po) {
      var _this3 = this;

      this.timesheetList = this.$filter('filter')(this.currentuser.timesheets, { short_date: moment(time).format('MM/DD/YYYY') });

      var dev_hours = false;
      var admin_hours = false;
      var test_hours = false;

      this.categories = [];

      angular.forEach(this.timesheetList, function (value, key) {

        if (_this3.timesheetList[key].po.id == po) {
          var cat = _this3.timesheetList[key].category;
          if (cat == "dev" && cat != updatecat) {
            dev_hours = true;
          }
          if (cat == "admin" && cat != updatecat) {
            admin_hours = true;
          }
          if (cat == "test" && cat != updatecat) {
            test_hours = true;
          }
        }
      });

      if (!dev_hours) {
        this.categories.push({
          type: "dev",
          desc: "Development"
        });
      }
      if (!admin_hours) {
        this.categories.push({
          type: "admin",
          desc: "Administration"
        });
      }
      if (!test_hours) {
        this.categories.push({
          type: "test",
          desc: "Test"
        });
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      //this.$state.go('timeentry');
      window.history.back();
    }
  }, {
    key: "register",
    value: function register(form) {
      var _this4 = this;

      this.submitted = true;

      var timerow = {};

      timerow = {
        po: {
          id: this.timesheet.po._id,
          name: this.timesheet.po.poid
        },
        date: new Date(this.timesheet.date),
        short_date: moment(this.timesheet.date).format('MM/DD/YYYY'),
        hours: this.timesheet.hours,
        category: this.timesheet.category,
        desc: this.timesheet.desc,
        status: "entered",

        skillset: {
          code: {
            cplus: angular.isDefined(this.timesheet.skillset.code.cplus) ? this.timesheet.skillset.code.cplus : false,
            javascript: angular.isDefined(this.timesheet.skillset.code.javascript) ? this.timesheet.skillset.code.javascript : false,
            csharp: angular.isDefined(this.timesheet.skillset.code.csharp) ? this.timesheet.skillset.code.csharp : false,
            plsql: angular.isDefined(this.timesheet.skillset.code.plsql) ? this.timesheet.skillset.code.plsql : false,
            java: angular.isDefined(this.timesheet.skillset.code.java) ? this.timesheet.skillset.code.java : false
          },
          db: {
            oracle: this.timesheet.skillset.db.oracle,
            sqlserver: this.timesheet.skillset.db.sqlserver,
            mysql: this.timesheet.skillset.db.mysql,
            mongo: this.timesheet.skillset.db.mongo
          },
          leadership: {
            management: this.timesheet.skillset.leadership.management,
            training: this.timesheet.skillset.leadership.training
          }
        }

        //fill the skills that were selected

      };

      this.poupdate._id = timerow.po.id;
      this.poupdate.hours = timerow.hours;

      if (this.updateForm) {
        this.currentuser.timesheets[this.timesheetidx] = timerow;
      } else {
        this.currentuser.timesheets.push(timerow);
      }

      if (form.$valid) {
        this.User.update(this.currentuser, function () {
          _this4.hoursUsed.update(_this4.poupdate, function () {
            //this.$state.go('timeentry');
            window.history.back();
          });
        });
      }
    }
  }]);

  return TimeentryDetailCtrl;
})();

angular.module('ytcwebUirouteApp').controller('TimeentryDetailCtrl', TimeentryDetailCtrl);
//# sourceMappingURL=timeentrydtl.controller.js.map
