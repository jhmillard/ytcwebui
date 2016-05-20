'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('po', {
    url: '/po',
    templateUrl: 'app/po/po.html',
    controller: 'PoCtrlA',
    controllerAs: 'po',
    authenticate: 'admin'
  }).state('podtl', {
    url: '/podtl?poid',
    templateUrl: 'app/po/podtl.html',
    controller: 'PoDtlCtrl',
    controllerAs: 'podtl',
    params: {
      poid: {
        value: '0',
        squash: true
      }
    },
    authenticate: 'admin'
  });
});
//# sourceMappingURL=po.js.map
