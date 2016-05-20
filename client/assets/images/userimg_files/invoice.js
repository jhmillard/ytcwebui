'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('invoice', {
    url: '/invoice',
    templateUrl: 'app/invoice/invoice.html',
    controller: 'InvoiceCtrl',
    controllerAs: 'invlist',
    authenticate: 'admin'
  }).state('invoicedtl', {
    url: '/invoicedtl',
    templateUrl: 'app/invoice/invoicedtl.html',
    controller: 'InvoiceDtlCtrl',
    controllerAs: 'invdtl',
    params: {
      invoiceid: {
        value: '0',
        squash: true
      }
    },
    authenticate: 'admin'
  }).state('invoiceview', {
    url: '/invoiceview?invoice',
    templateUrl: 'app/invoice/invoiceview.html',
    controller: 'InvoiceViewCtrl',
    controllerAs: 'inview',
    params: {
      invoice: {
        value: '0',
        squash: true
      }
    }
    //authenticate: 'admin'
  });
});
//# sourceMappingURL=invoice.js.map
