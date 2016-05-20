'use strict';

describe('Controller: ContractorpoCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var ContractorpoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContractorpoCtrl = $controller('ContractorpoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
