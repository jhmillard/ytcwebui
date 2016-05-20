'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('contractordash', {
    url: '/contractordash',
    templateUrl: 'app/contractordash/contractordash.html',
    controller: 'ContractordashCtrl',
    controllerAs: 'contractordash',
    authenticate: 'contractor'
  });
});
//# sourceMappingURL=contractordash.js.map
