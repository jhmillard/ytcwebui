'use strict';

describe('Controller: ContractordashCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var ContractordashCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContractordashCtrl = $controller('ContractordashCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
