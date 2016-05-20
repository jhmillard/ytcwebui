'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth,$scope) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isAdmin = Auth.isAdmin;
    this.isContractor = Auth.isNavContractor;
    this.isClient = Auth.isNavClient;


    //$scope.isLoggedIn = this.isLoggedIn();


    //this.getCurrentUser = Auth.getCurrentUser();
    //this.isContractor = Auth.isContractor();
    //this.loggedIn = Auth.isLoggedIn();
    //$scope.isContractor = (Auth.getCurrentUser().role == 'contractor');
    //$scope.getCurrentUser = Auth.getCurrentUser;



    //$scope.currentUser = Auth.getCurrentUser();

  }

}

angular.module('ytcwebUirouteApp')
  .controller('NavbarController', NavbarController);
