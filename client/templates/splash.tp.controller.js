'use strict';

class SplashTempController{
  constructor(Auth,$scope){
    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isAdmin = Auth.isAdmin();
    this.isContractor = Auth.isContractor;

    this.testStuff = "MY TEST STUFF";
  }
}

angular.module('ytcwebUirouteApp')
  .controller('SplashTempController',SplashTempController);
