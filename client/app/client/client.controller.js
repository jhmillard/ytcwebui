'use strict';


class ClientCtrl{

  constructor($scope,Client,$rootScope,$mdEditDialog,$q){
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

  }
}


angular.module('ytcwebUirouteApp')
  .controller('ClientCtrl', ClientCtrl);
