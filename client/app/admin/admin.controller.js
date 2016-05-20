'use strict';

(function() {

class AdminController {
  constructor(User,Po, $scope, $rootScope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.pos = Po.query();

    $scope.selected = [];

    $scope.query = {
      order: 'last_name',
      limit: 5,
      page: 1
    };

    $rootScope.previousPage = "admin";


  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('ytcwebUirouteApp.admin')
  .controller('AdminController', AdminController);

})();
