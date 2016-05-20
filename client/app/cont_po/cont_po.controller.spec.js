'use strict';

describe('Controller: ContPoCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var ContPoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContPoCtrl = $controller('ContPoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
