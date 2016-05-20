'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var TimeentryCtrl = (function () {
  function TimeentryCtrl(Auth, $scope, User, $state, $filter, ChartService) {
    var _this = this;

    _classCallCheck(this, TimeentryCtrl);

    $scope.test = "TEST";

    this.currentuser = User.get({ id: Auth.getCurrentUser()._id }, function () {
      _this.configureCharts($scope, $filter);

      //Here is a way to use a Chart Service to create the chart information so we can use a service over again.
      //currently it is NOT being used
      var sChart = new ChartService(_this.currentuser.timesheets);
      _this.rowdata = sChart.getChartSet();
    });
    this.User = User;
    this.showform = false;
    this.$state = $state;
    this.showline = true;
    this.showpie = false;

    $scope.selected = [];

    $scope.query = {
      order: 'poid',
      limit: 5,
      page: 1
    };

    // $scope.$apply();
  }

  _createClass(TimeentryCtrl, [{
    key: 'removeitem',
    value: function removeitem(index) {
      var _this2 = this;

      this.currentremove = index;

      this.currentuser.timesheets.splice(index, 1);
      //now do an update on current user.
      this.User.update(this.currentuser, function () {
        _this2.$state.reload();
      });
    }
  }, {
    key: 'showPie',
    value: function showPie() {
      this.showpie = true;
      this.showline = false;
    }
  }, {
    key: 'configureCharts',
    value: function configureCharts($scope, $filter) {

      $scope.column_array = [];
      $scope.data_array_admin = [];
      $scope.data_array_dev = [];
      $scope.data_array_test = [];
      $scope.column_array.push('x');
      $scope.data_array_admin.push('Administration');
      $scope.data_array_dev.push('Development');
      $scope.data_array_test.push('Testing');

      $scope.development_hours = [];
      $scope.admin_hours = [];
      $scope.test_hours = [];
      $scope.development_hours.push('Development');
      $scope.admin_hours.push('Administration');
      $scope.test_hours.push('Testing');

      $scope.total_admin = 0;
      $scope.total_dev = 0;
      $scope.total_test = 0;

      //heres the code skill breakdown
      $scope.cplus_hours = [];
      $scope.cplus_hours.push('C++');
      $scope.cplus_hours.push(0);
      $scope.csharp_hours = [];
      $scope.csharp_hours.push('C#');
      $scope.csharp_hours.push(0);
      $scope.javascript_hours = [];
      $scope.javascript_hours.push('JavaScript');
      $scope.javascript_hours.push(0);
      $scope.java_hours = [];
      $scope.java_hours.push('Java');
      $scope.java_hours.push(0);
      $scope.plsql_hours = [];
      $scope.plsql_hours.push('PL/SQL');
      $scope.plsql_hours.push(0);

      //DB Skills
      $scope.oracle_hours = [];
      $scope.oracle_hours.push('Oracle');
      $scope.oracle_hours.push(0);
      $scope.sqlserver_hours = [];
      $scope.sqlserver_hours.push('SQL Server');
      $scope.sqlserver_hours.push(0);
      $scope.mysql_hours = [];
      $scope.mysql_hours.push('MySQL');
      $scope.mysql_hours.push(0);
      $scope.mongo_hours = [];
      $scope.mongo_hours.push('MongoDB');
      $scope.mongo_hours.push(0);

      $scope.ordered_time = $filter('orderBy')(this.currentuser.timesheets, 'short_date');
      $scope.currentDate = "";
      $scope.firstPass = true;
      $scope.adminPushed = false;
      $scope.devPushed = false;
      $scope.testPushed = false;
      angular.forEach($scope.ordered_time, function (value, key) {

        //build our totals for our different skills.
        if ($scope.ordered_time[key].skillset.code.cplus) {
          $scope.cplus_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.code.csharp) {
          $scope.csharp_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.code.javascript) {
          $scope.javascript_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.code.java) {
          $scope.java_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.code.plsql) {
          $scope.plsql_hours.push($scope.ordered_time[key].hours);
        }

        //Build DB skill set totals
        if ($scope.ordered_time[key].skillset.db.oracle) {
          $scope.oracle_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.db.sqlserver) {
          $scope.sqlserver_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.db.mysql) {
          $scope.mysql_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].skillset.db.mongo) {
          $scope.mongo_hours.push($scope.ordered_time[key].hours);
        }

        if ($scope.currentDate != $scope.ordered_time[key].short_date) {

          $scope.column_array.push($scope.ordered_time[key].short_date);
          $scope.currentDate = $scope.ordered_time[key].short_date;

          if (!$scope.firstPass) {
            if (!$scope.devPushed) {
              $scope.data_array_dev.push(0);
            } else {
              $scope.devPushed = false;
            }
            if (!$scope.adminPushed) {
              $scope.data_array_admin.push(0);
            } else {
              $scope.adminPushed = false;
            }
            if (!$scope.testPushed) {
              $scope.data_array_test.push(0);
            } else {
              $scope.testPushed = false;
            }
          }
          $scope.firstPass = false;
        }

        if ($scope.ordered_time[key].category == "dev") {
          $scope.data_array_dev.push($scope.ordered_time[key].hours);
          $scope.devPushed = true;
          $scope.development_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].category == "admin") {
          $scope.data_array_admin.push($scope.ordered_time[key].hours);
          $scope.adminPushed = true;
          $scope.admin_hours.push($scope.ordered_time[key].hours);
        }
        if ($scope.ordered_time[key].category == "test") {
          $scope.data_array_test.push($scope.ordered_time[key].hours);
          $scope.testPushed = true;
          $scope.test_hours.push($scope.ordered_time[key].hours);
        }
      });

      if (!$scope.devPushed) {
        $scope.data_array_dev.push(0);
      }
      if (!$scope.adminPushed) {
        $scope.data_array_admin.push(0);
      }
      if (!$scope.testPushed) {
        $scope.data_array_test.push(0);
      }

      $scope.pieData = [];
      $scope.pieData.push($scope.total_dev);
      $scope.pieData.push($scope.total_admin);
      $scope.pieData.push($scope.total_test);

      $scope.colData = [];
      $scope.colData.push($scope.column_array);
      $scope.colData.push($scope.data_array_dev);
      $scope.colData.push($scope.data_array_admin);
      $scope.colData.push($scope.data_array_test);

      //var chart = c3.generate({
      //  bindto: "#chart1",
      //  data: {
      //    x: 'x',
      //    xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
      //    columns: $scope.colData
      //  },
      //  axis: {
      //    x: {
      //      type: 'timeseries',
      //      tick: {
      //        format: '%m/%d/%y'
      //      }
      //    } ,
      //    y: {
      //      max: 12,
      //      tick: {
      //        format: d3.format('.0f')
      //      }
      //    }
      //  }
      //});

      var chart = c3.generate({
        bindto: "#chart1",
        data: {
          x: 'x',
          xFormat: '%m/%d/%Y', // 'xFormat' can be used as custom format of 'x'
          columns: $scope.colData,
          labels: true,
          type: 'spline'
        },
        subchart: {
          show: true
        },
        zoom: {
          enabled: true
        },
        grid: {
          x: {
            show: true

          },
          y: {
            show: true
          }
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%m/%d/%y',
              rotate: 90,
              fit: true
            }
          },
          y: {
            max: 12,
            tick: {
              format: d3.format('.0f')
            }
          }
        }
      });

      //Pie chart
      $scope.chart2 = c3.generate({
        bindto: "#chart2",
        data: {
          columns: [$scope.development_hours],
          type: 'donut',
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
        donut: {
          title: "Timesheet Usage"
        }
      });
      setTimeout(function () {
        $scope.chart2.load({
          columns: [$scope.admin_hours]
        });
      }, 1000);
      setTimeout(function () {
        $scope.chart2.load({
          columns: [$scope.test_hours]
        });
      }, 2000);

      ////Pie chart
      $scope.chart3 = c3.generate({
        bindto: "#chart3",
        data: {
          columns: [$scope.cplus_hours],
          type: 'donut',
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
        donut: {
          title: "Code Skill Usage"
        }
      });
      setTimeout(function () {
        $scope.chart3.load({
          columns: [$scope.csharp_hours]
        });
      }, 500);
      setTimeout(function () {
        $scope.chart3.load({
          columns: [$scope.javascript_hours]
        });
      }, 1000);
      setTimeout(function () {
        $scope.chart3.load({
          columns: [$scope.java_hours]
        });
      }, 1500);
      setTimeout(function () {
        $scope.chart3.load({
          columns: [$scope.plsql_hours]
        });
      }, 2000);

      ////Pie chart
      $scope.chart4 = c3.generate({
        bindto: "#chart4",
        data: {
          columns: [$scope.oracle_hours],
          type: 'donut',
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
        donut: {
          title: "Database Skill Usage"
        }
      });
      setTimeout(function () {
        $scope.chart4.load({
          columns: [$scope.sqlserver_hours]
        });
      }, 500);
      setTimeout(function () {
        $scope.chart4.load({
          columns: [$scope.mysql_hours]
        });
      }, 1000);
      setTimeout(function () {
        $scope.chart4.load({
          columns: [$scope.mongo_hours]
        });
      }, 1500);
    }
  }]);

  return TimeentryCtrl;
})();

angular.module('ytcwebUirouteApp').controller('TimeentryCtrl', TimeentryCtrl);
//# sourceMappingURL=timeentry.controller.js.map
