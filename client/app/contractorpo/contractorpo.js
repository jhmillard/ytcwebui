'use strict';

angular.module('ytcwebUirouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contractorpo', {
        url: '/contractorpo?poid',
        templateUrl: 'app/contractorpo/contractorpo.html',
        controller: 'ContractorpoCtrl',
        controllerAs: 'contractorpo',
        params:{
          poid: {
            value: '0',
            squash: true
          }
        },
        authenticate: 'contractor'
      });
  });
