'use strict';

describe('Controller: ClientdashCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var ClientdashCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClientdashCtrl = $controller('ClientdashCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
