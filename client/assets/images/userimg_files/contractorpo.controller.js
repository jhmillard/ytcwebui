'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ContractorpoCtrl = (function () {
  function ContractorpoCtrl(Auth, $scope, User, Po, $stateParams, ChartService, $filter) {
    var _this = this;

    _classCallCheck(this, ContractorpoCtrl);

    $scope.test = "TEST";

    var totalHoursUsed = 0;
    this.currentPo = [];

    //this.currentuser = User.get({id: Auth.getCurrentUser()._id},()=>{
    //  this.configureCharts($scope,$filter);
    //  var sChart = new ChartService(this.currentuser.timesheets);
    //  this.rowdata = sChart.getChartSet();
    //
    //
    //
    //});

    this.currentPo = Po.get({ id: $stateParams.poid }, function () {
      //this.currentuser = Auth.getCurrentUser();
      _this.currentuser = User.get({ id: Auth.getCurrentUser()._id }, function () {

        //need to get the client
        _this.client = User.get({ id: _this.currentPo.client }, function () {

          //now we need to count the number of hours used on this PO.   so... we can iterate through the timesheets...
          angular.forEach(_this.currentuser.timesheets, function (value, key) {

            if (_this.currentuser.timesheets[key].po.id == _this.currentPo._id) {
              totalHoursUsed = totalHoursUsed + _this.currentuser.timesheets[key].hours;
            }
          });
          _this.hours_used = totalHoursUsed;
          _this.configureCharts($scope, $filter);
        });
      });
    });
  }

  _createClass(ContractorpoCtrl, [{
    key: 'configureCharts',

    //

    value: function configureCharts($scope, $filter) {

      this.seeworks = this.hours_used;

      if (this.hours_used * 100 / this.currentPo.hours > 90) {
        this.gauge_color = '#f62d47';
      } else {
        this.gauge_color = '#49ff00';
      }

      var chart = c3.generate({
        bindto: "#chart1",
        data: {
          columns: [['data', this.hours_used]],
          type: 'gauge',
          onclick: function onclick(d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function onmouseover(d, i) {
            console.log("onmouseover", d, i);
          },
          onmouseout: function onmouseout(d, i) {
            console.log("onmouseout", d, i);
          }
        },
        gauge: {
          min: 0,
          max: this.currentPo.hours
          //max: this.currentPo.hours
        },
        color: {
          pattern: [this.gauge_color],
          threshold: {
            values: [0]
          }
        }
      });
    }
  }]);

  return ContractorpoCtrl;
})();

angular.module('ytcwebUirouteApp').controller('ContractorpoCtrl', ContractorpoCtrl);
//# sourceMappingURL=contractorpo.controller.js.map
