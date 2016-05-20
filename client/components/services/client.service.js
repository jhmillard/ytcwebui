'use strict';

(function() {

  function ClientResource($resource) {
    return $resource('/api/clients/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('Client', ClientResource);

})();
