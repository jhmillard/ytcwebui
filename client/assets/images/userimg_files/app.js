'use strict';

angular.module('ytcwebUirouteApp', ['ytcwebUirouteApp.auth', 'ytcwebUirouteApp.admin', 'ytcwebUirouteApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap', 'validation.match', 'ngMaterial', 'ngMdIcons', 'md.data.table', 'ngMessages', 'gridshore.c3js.chart']).config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default').primaryPalette('pink', {
    'default': '400', // by default use shade 400 from the pink palette for primary intentions
    'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
    'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
    'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
  });
}).controller('AppCtrl', function ($scope, Auth) {
  //$scope.currentUser = Auth.getCurrentUser();
  Auth.getCurrentUser(function (value) {
    $scope.isContractor = Auth.isContractor();
  });
}).run(function ($rootScope, $state, $stateParams, $location, Auth) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
    // to be used for back button //won't work when page is reloaded.
    $rootScope.previousState_name = fromState.name;
    $rootScope.previousState_params = fromParams;
    $rootScope.loading = false;
  });
  $rootScope.$on("$stateChangeStart", function (event, toState) {

    $rootScope.loading = true;
    $rootScope.authMessage = "";
    //This is where we authenticate the UI route on authenticate by role.

    $rootScope.authToState = toState.authenticate;
    $rootScope.isContractor = Auth.isContractor();

    if (toState.authenticate == "contractor" && !Auth.isContractor()) {
      $rootScope.authMessage = "Invalid Authentication";
      $location.path('/main');
    }
    if (toState.authenticate == "client" && !Auth.isClient()) {
      $rootScope.authMessage = "Invalid Authentication";
      $location.path('/main');
    }
  });
  //back button function called from back button's ng-click="back()"
  $rootScope.back = function () {
    $state.go($rootScope.previousState_name, $rootScope.previousState_params);
  };
});
//# sourceMappingURL=app.js.map
