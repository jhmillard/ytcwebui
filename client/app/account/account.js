'use strict';

angular.module('ytcwebUirouteApp')
  .config(function($stateProvider) {
    $stateProvider
      //.state('login', {
      //  url: '/login',
      //  templateUrl: 'app/account/login/login.html',
      //  controller: 'LoginController',
      //  controllerAs: 'vm'
      //})
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'main',
        template: '',
        controller: function($state, Auth) {
          console.log('inside sate for logout');

          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'main';
          console.log(Auth.getCurrentUser().name);
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
        //authenticate: 'admin'
      })
      .state('thankyou', {
        url: '/thankyou',
        templateUrl: 'app/account/signup/thankyou.html',
        controller: 'ThankyouController',
        controllerAs: 'ty'
        //authenticate: 'admin'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });