'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('client', {
    url: '/client',
    templateUrl: 'app/client/client.html',
    controller: 'ClientCtrl',
    controllerAs: 'client',
    authenticate: 'admin'
  }).state('clientdtl', {
    url: '/clientdtl?clientid',
    templateUrl: 'app/client/clientdtl.html',
    controller: 'ClientDtlCtrl',
    controllerAs: 'clientdtl',
    params: {
      clientid: {
        value: '0',
        squash: true
      }
    },
    authenticate: 'admin'
  });
});
//# sourceMappingURL=client.js.map
