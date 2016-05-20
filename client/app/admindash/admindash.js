'use strict';

angular.module('ytcwebUirouteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admindash', {
        url: '/admindash',
        templateUrl: 'app/admindash/admindash.html',
        controller: 'AdmindashCtrl',
        authenticate: 'admin',
        controllerAs: 'admindash'
      })
    .state('userimg',{
      url: '/userimg?userid',
      templateUrl: 'app/admindash/userimg.html',
      controller: 'UserImgCtrl',
      controllerAs: 'userimg',
      authenticate: 'admin',
      params:{
        userid: {
          value: '0',
          squash: true
        }
      },
    });
  });
