'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var NavbarController =
//end-non-standard

function NavbarController(Auth, $scope) {
  _classCallCheck(this, NavbarController);

  this.menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  this.isCollapsed = true;

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
};

angular.module('ytcwebUirouteApp').controller('NavbarController', NavbarController);

//start-non-standard
//# sourceMappingURL=navbar.controller.js.map
