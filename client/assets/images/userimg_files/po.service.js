'use strict';

(function () {

  function PoResource($resource) {
    return $resource('/api/pos/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        isArray: false
      },
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp').factory('Po', PoResource);
})();

(function () {

  function PoResource($resource) {
    return $resource('/api/pos/contractor/:contractor', {
      contractor: '@contractor'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp').factory('PoContractor', PoResource);
})();

(function () {

  function PoResource($resource) {
    return $resource('/api/pos/client/:client', {
      client: '@client'
    }, {
      update: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp').factory('PoClient', PoResource);
})();

(function () {

  function PoResource($resource) {
    return $resource('/api/pos/findstatus/:status', {
      status: '@status'
    }, {
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }

  angular.module('ytcwebUirouteApp').factory('PoStatus', PoResource);
})();

(function () {

  function PoResource($resource) {
    return $resource('/api/pos/hoursused/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular.module('ytcwebUirouteApp').factory('PoHoursUsed', PoResource);
})();
//# sourceMappingURL=po.service.js.map
