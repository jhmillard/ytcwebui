'use strict';

angular.module('ytcwebUirouteApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          '': {
            templateUrl: 'templates/main.tp.html',
            //controllerAs: 'MainControllerTP'
            //templateUrl: 'main/main.html'
          },
          'splash@main':{
            templateUrl: 'templates/splash.tp.html',
            controller: 'SplashTempController',
            controllerAs: 'splash'
          },
          'login@main':{
            templateUrl: 'components/login/login.tp.html',
            controller: 'LoginControllerTP',
            controllerAs: 'login'
          }
        }
      })
  });
