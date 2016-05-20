'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('clientdash', {
    url: '/clientdash',
    templateUrl: 'app/clientdash/clientdash.html',
    authenticate: 'client',
    controller: 'ClientdashCtrl',
    controllerAs: 'clientdash'
  });
});
//# sourceMappingURL=clientdash.js.map
