'use strict';

angular.module('ytcwebUirouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('timeentry', {
        url: '/timeentry',
        templateUrl: 'app/timeentry/timeentry.html',
        controller: 'TimeentryCtrl',
        controllerAs: 'time',
        authenticate: 'contractor'
      })
    .state('timeentrydtl', {
      url: '/timeentrydtl/:userid/:timesheetid',
      templateUrl: 'app/timeentry/timeentrydtl.html',
      resolve:{
        user: function($stateParams,User){
          return User.get({id: $stateParams.userid}).$promise;
        },
        currentpos: function(PoStatus){
          return PoStatus.get({status: "open"}).$promise;
        }
      },
      controller: 'TimeentryDetailCtrl',
      controllerAs: 'timedtl',
      authenticate: 'contractor',
      params:{
        userid: {
          value: '0',
          squash: true
        },
        timesheetid: {
          value: '0',
          squash: true
        }
      }
    })
      .state('timeview', {
        url: '/timeview/:userid/:timesheetid',
        templateUrl: 'app/timeentry/timeview.html',
        controller: 'TimeViewCtrl',
        controllerAs: 'timeview',
        authenticate: 'contractor',
        params:{
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
