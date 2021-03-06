'use strict';

angular.module('ytcwebUirouteApp').config(function ($stateProvider) {
  $stateProvider.state('timeentry', {
    url: '/timeentry',
    templateUrl: 'app/timeentry/timeentry.html',
    controller: 'TimeentryCtrl',
    controllerAs: 'time',
    authenticate: 'contractor'
  }).state('timeentrydtl', {
    url: '/timeentrydtl/:userid/:timesheetid',
    templateUrl: 'app/timeentry/timeentrydtl.html',
    controller: 'TimeentryDetailCtrl',
    controllerAs: 'timedtl',
    authenticate: 'contractor',
    params: {
      userid: {
        value: '0',
        squash: true
      },
      timesheetid: {
        value: '0',
        squash: true
      }
    }
  });
});
//# sourceMappingURL=timeentry.js.map
