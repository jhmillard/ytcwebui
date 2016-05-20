'use strict';

angular.module('ytcwebUirouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('milestones', {
        url: '/milestones',
        templateUrl: 'app/milestones/milestones.html',
        controller: 'MilestonesCtrl',
        authenticate: 'admin',
      });
  });
