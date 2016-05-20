'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClientCtrl = function ClientCtrl($scope, Client, $rootScope, $mdEditDialog, $q) {
  _classCallCheck(this, ClientCtrl);

  $scope.text = "Hello";

  this.clientlist = Client.query();
  $scope.selected = [];
  $scope.options = {
    autoSelect: true,
    boundaryLinks: false,
    largeEditDialog: false,
    pageSelector: false,
    rowSelection: true
  };

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $rootScope.previousPage = "client";
};

angular.module('ytcwebUirouteApp').controller('ClientCtrl', ClientCtrl);
//# sourceMappingURL=client.controller.js.map
