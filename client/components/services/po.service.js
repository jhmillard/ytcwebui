'use strict';

(function() {

  function PoResource($resource) {
    return $resource('/api/pos/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
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

  angular.module('ytcwebUirouteApp')
    .factory('Po', PoResource);

})();


(function() {

  function PoResource($resource) {
    return $resource('/api/pos/poid/:poid', {
      poid: '@poid'
    }, {
      get: {
        method:'GET',
        isArray:false
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('PoId', PoResource);

})();


(function() {

  function PoResource($resource) {
    return $resource('/api/pos/contractor/:contractor', {
      contractor: '@contractor'
    }, {
      update: {
        method: 'PUT'
      },
      get:{
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('PoContractor', PoResource);

})();

(function() {

  function PoResource($resource) {
    return $resource('/api/pos/client/:client', {
      client: '@client'
    }, {
      update: {
        method: 'PUT'
      },
      get:{
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('PoClient', PoResource);

})();

(function() {

  function PoResource($resource) {
    return $resource('/api/pos/findstatus/:status',{
      status: '@status'
    },
     {
      get:{
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('PoStatus', PoResource);

})();

(function() {

  function PoResource($resource) {
    return $resource('/api/pos/hoursused/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('PoHoursUsed', PoResource);

})();





(function() {
  function PoValueService($filter,User) {

    this.filter = $filter;

    var PoValue = {

      //CurrentPO is the PO JSON OBJECT
      getPoHoursUsed(poTimesheets){
        var sumHoursUsed = 0;

          angular.forEach(poTimesheets,(value,key)=>{
            sumHoursUsed += poTimesheets[key].hours;
          })

        return sumHoursUsed;

      },
      getPoHoursAvailable(currentPo,poTimsheets){
        var sumHoursUsed = 0;

        angular.forEach(poTimsheets,(value,key)=>{
          sumHoursUsed += poTimsheets[key].hours;
        })

        return (currentPo.hours - sumHoursUsed);

      },
      getPoUserObject(currentPo){

      },
      isPoActive(currentPo){

      },
      activePoList(){

      },
      getNextPoId(){

      }

    }

    return PoValue;
  }
angular.module('ytcwebUirouteApp')
  .factory('PoValue',PoValueService);

})();






