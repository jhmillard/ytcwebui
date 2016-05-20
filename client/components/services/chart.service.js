






'use strict';

(function() {
  function chartService($filter,User) {

    var Chart = {

      getUserTimesheetJSON(currentUser){



        var orderedTime = $filter('orderBy')(currentUser.timesheets,'short_date');

        var previousDate;
        var timeSeriesJSONArray = [];
        var dateArray = [];
        var devArray = [];
        var adminArray = [];
        var testArray = [];
        var chartArray = [];
        var timeSeriesJSONElement = {};
        var devHours = 0;
        var testHours = 0;
        var adminHours = 0;
        var iterator = 0;


        dateArray.push('x');
        devArray.push('Development');
        adminArray.push('Admin');
        testArray.push('Testing')



        angular.forEach(orderedTime,(value,key)=> {

          if(orderedTime[key].short_date != previousDate && iterator > 0){

            timeSeriesJSONElement = {
              date: previousDate,
              devHours: devHours,
              adminHours: adminHours,
              testHours: testHours
            }
            //push to row -
            timeSeriesJSONArray.push(timeSeriesJSONElement);
            timeSeriesJSONElement = {};
            devHours = 0;
            testHours = 0;
            adminHours = 0;
          }

          if(orderedTime[key].category == 'dev'){
            devHours += orderedTime[key].hours;
          }
          if(orderedTime[key].category == 'admin'){
            adminHours += orderedTime[key].hours;
          }
          if(orderedTime[key].category == 'test'){
            testHours += orderedTime[key].hours;
          }

          previousDate = orderedTime[key].short_date;
          iterator += 1;


          //timeSeriesJSONElement =
          //{
          //  date: currentUser.timesheets[key].short_date,
          //  dev_hours
          //
          //}

          if((orderedTime.length -1) == key){
            //last element
            timeSeriesJSONElement = {
              date: previousDate,
              devHours: devHours,
              adminHours: adminHours,
              testHours: testHours
            }
            timeSeriesJSONArray.push(timeSeriesJSONElement);

          }
        });


        //now that I have an array I can build the array of arrays...
        angular.forEach(timeSeriesJSONArray,(jvalue,jkey)=>{

          dateArray.push(timeSeriesJSONArray[jkey].date);
          devArray.push(timeSeriesJSONArray[jkey].devHours);
          testArray.push(timeSeriesJSONArray[jkey].testHours);
          adminArray.push(timeSeriesJSONArray[jkey].adminHours);
        })

        chartArray.push(dateArray);
        chartArray.push(devArray);
        chartArray.push(testArray);
        chartArray.push(adminArray);

        return chartArray;

      },

      getUserSkillsJSON(currentUser){

        //this will build my skills JSON...

      },

      getPurchaseOrderTimesheetJSON(currentPO){

        //need to get ALL timesheets for a particular PO.  Therefore we need to iterate through the contractor attached timesheets
        //so... we will get the USER first... which is the PO.contrator.
        var poTimesheets = [];

        this.contractor = User.get({id:currentPO.contractor},()=>{
          //iterate through the timesheets and push sheet rows onto a new PO time array.
          angular.forEach(this.contractor.timesheets,(value,key)=>{
            if(this.contractor.timesheets[key].po.id == currentPO._id){
              poTimesheets.push(this.contractor.timesheets[key]);
            }
          })
          //once we have the poTimesheets list... we can then create our chart array.
          //this.timesheetsJSON = this.returnTimesheetListDataJSON(poTimesheets);

        })
        return this.returnTimesheetListDataJSON(poTimesheets);
      },

      getUserTimeCategoryJSON(currentUser){


      },

      returnTimesheetListDataJSON(timesheets){

        var orderedTime =  $filter('orderBy')(timesheets,'short_date');
        var previousDate;
        var timeSeriesJSONArray = [];
        var dateArray = [];
        var devArray = [];
        var adminArray = [];
        var testArray = [];
        var chartArray = [];
        var timeSeriesJSONElement = {};
        var devHours = 0;
        var testHours = 0;
        var adminHours = 0;
        var iterator = 0;


        dateArray.push('x');
        devArray.push('Development');
        adminArray.push('Admin');
        testArray.push('Testing');



        angular.forEach(orderedTime,(value,key)=> {

          if(orderedTime[key].short_date != previousDate && iterator > 0){

            timeSeriesJSONElement = {
              date: previousDate,
              devHours: devHours,
              adminHours: adminHours,
              testHours: testHours
            }
            //push to row -
            timeSeriesJSONArray.push(timeSeriesJSONElement);
            timeSeriesJSONElement = {};
            devHours = 0;
            testHours = 0;
            adminHours = 0;
          }

          if(orderedTime[key].category == 'dev'){
            devHours += orderedTime[key].hours;
          }
          if(orderedTime[key].category == 'admin'){
            adminHours += orderedTime[key].hours;
          }
          if(orderedTime[key].category == 'test'){
            testHours += orderedTime[key].hours;
          }

          previousDate = orderedTime[key].short_date;
          iterator += 1;


          //timeSeriesJSONElement =
          //{
          //  date: currentUser.timesheets[key].short_date,
          //  dev_hours
          //
          //}

          if((orderedTime.length -1) == key){
            //last element
            timeSeriesJSONElement = {
              date: previousDate,
              devHours: devHours,
              adminHours: adminHours,
              testHours: testHours
            }
            timeSeriesJSONArray.push(timeSeriesJSONElement);

          }
        });


        //now that I have an array I can build the array of arrays...
        angular.forEach(timeSeriesJSONArray,(jvalue,jkey)=>{

          dateArray.push(timeSeriesJSONArray[jkey].date);
          devArray.push(timeSeriesJSONArray[jkey].devHours);
          testArray.push(timeSeriesJSONArray[jkey].testHours);
          adminArray.push(timeSeriesJSONArray[jkey].adminHours);
        })

        chartArray.push(dateArray);
        chartArray.push(devArray);
        chartArray.push(testArray);
        chartArray.push(adminArray);

        return chartArray;

      }

    }

  return Chart;
}




angular.module('ytcwebUirouteApp')
  .factory('Chart',chartService);

})();






//
//)
//  .service('ChartService',function($filter){
//    return function(timeObj){
//      this.myTimesheets = timeObj;
//      this.colRow = [];
//
//      this.addTimeSet = function(timeObj){
//        this.myTimesheets = timeObj;
//      }
//
//      this.getChartSet = function(){
//
//        var orderedHours = $filter('orderBy')(this.myTimesheets,'hours');
//
//        angular.forEach(orderedHours,(value,key)=>{
//          this.colRow.push(orderedHours[key].hours);
//        })
//
//
//        //$filter('orderBy')(array, expression, reverse)
//          //return $filter('orderBy')(this.colRow,'-hours');
//          return this.colRow;
//      }
//
//    }
//  })
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
