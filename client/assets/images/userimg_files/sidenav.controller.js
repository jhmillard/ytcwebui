'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var SidenavController =
//end-non-standard

function SidenavController(Auth) {
  _classCallCheck(this, SidenavController);

  this.menu = [{
    link: '',
    title: 'Dashboard',
    icon: 'dashboard'
  }, {
    link: '',
    title: 'Friends',
    icon: 'group'
  }, {
    link: '',
    title: 'Messages',
    icon: 'message'
  }];
  this.admin = [{
    link: '',
    title: 'Trash',
    icon: 'delete'
  }, {
    link: 'showListBottomSheet($event)',
    title: 'Settings',
    icon: 'settings'
  }];
  this.isCollapsed = true;

  this.isLoggedIn = Auth.isLoggedIn;
  this.isAdmin = Auth.isAdmin;
  this.getCurrentUser = Auth.getCurrentUser;
};

angular.module('ytcwebUirouteApp').controller('SidenavController', SidenavController);

//start-non-standard
//menu = [{
//  'title': 'Home',
//  'state': 'main'
//}];
//# sourceMappingURL=sidenav.controller.js.map
