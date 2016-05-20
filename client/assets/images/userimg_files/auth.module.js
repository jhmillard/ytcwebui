'use strict';

angular.module('ytcwebUirouteApp.auth', ['ytcwebUirouteApp.constants', 'ytcwebUirouteApp.util', 'ngCookies', 'ui.router']).config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=auth.module.js.map
