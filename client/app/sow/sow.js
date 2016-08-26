'use strict';

angular.module('ytcwebUirouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('sow', {
        url: '/sow',
        templateUrl: 'app/sow/sow.html',
        controller: 'SowCtrl'
      });
  });
