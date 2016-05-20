'use strict';

(function() {

  function UserResource($resource) {
    return $resource('/api/users/role/:role', {
      role: '@role'
    },
    {
      get: {
        method:'GET',
        isArray:false
      },
      query: {
        method:'GET',
        isArray:true
      }
    });
  }

  function getChartData(currentUser){




      //have the current user that we need to build the JSON for our C3 charts.
      var timeSeriesJSONArray = [];
      var timeSeriesJSONElement = {};

      angular.forEach(currentUser.timesheets,(value,key)=> {

        timeSeriesJSONElement =
        {
          date: currentUser.timesheets[key].short_date
        }


        timeSeriesJSONArray.push(timeSeriesJSONElement);

      });

      return timeSeriesJSONArray;
    }



  angular.module('ytcwebUirouteApp')
    .factory('UserRole', UserResource)
    .service('UserTimeSeriesChart',()=>{
      this.getChartData = (user)=>{

        //have the current user that we need to build the JSON for our C3 charts.
        var timeSeriesJSONArray = [];
        var timeSeriesJSONElement = {};

        angular.forEach(currentUser.timesheets,(value,key)=> {

          timeSeriesJSONElement =
          {
            date: currentUser.timesheets[key].short_date
          }


          timeSeriesJSONArray.push(timeSeriesJSONElement);

        });
        return timeSeriesJSONArray;
      }
    })
})();





