'use strict';

angular.module('ytcwebUirouteApp').factory('ChartFactory', function (User) {}).service('ChartService', function ($filter) {
  return function (timeObj) {
    this.myTimesheets = timeObj;
    this.colRow = [];

    this.addTimeSet = function (timeObj) {
      this.myTimesheets = timeObj;
    };

    this.getChartSet = function () {
      var _this = this;

      var orderedHours = $filter('orderBy')(this.myTimesheets, 'hours');

      angular.forEach(orderedHours, function (value, key) {
        _this.colRow.push(orderedHours[key].hours);
      });

      //$filter('orderBy')(array, expression, reverse)
      //return $filter('orderBy')(this.colRow,'-hours');
      return this.colRow;
    };
  };
});
//.service('ChartService',function(){
//  this.rowData = function(timesheets){
//    var rowjson = [];
//    angular.forEach(timesheets,(key,value)=>{
//      var row =
//      {
//        type: timesheets[key].category,
//        hours: timesheets[key].hours
//      };
//      rowjson.push(row);
//    });
//    return rowjson;
//  };
//})
//# sourceMappingURL=chart.service.js.map
