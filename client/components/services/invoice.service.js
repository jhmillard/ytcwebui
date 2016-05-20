'use strict';

(function() {

  function InvoiceResource($resource) {
    return $resource('/api/invoices/:id', {
      id: '@_id',
      status: '@status',
      poid: '@poid'
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
      },
      removetime:{
        method: 'POST',
        url: '/api/invoices/removetime'
      },
      querystatus:{
        method:'GET',
        isArray:true,
        url:'/api/invoices/status/:status'
      },
      querypo:{
        method:'GET',
        isArray:true,
        url: '/api/invoices/po/:poid'
      }
    });
  }

  angular.module('ytcwebUirouteApp')
    .factory('Invoice', InvoiceResource);

})();
