'use strict';

class SidenavController {
  //start-non-standard
  //menu = [{
  //  'title': 'Home',
  //  'state': 'main'
  //}];
  menu = [{
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
  admin = [{
  link: '',
  title: 'Trash',
  icon: 'delete'
  }, {
  link: 'showListBottomSheet($event)',
  title: 'Settings',
  icon: 'settings'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

  }

}

angular.module('ytcwebUirouteApp')
  .controller('SidenavController', SidenavController);
