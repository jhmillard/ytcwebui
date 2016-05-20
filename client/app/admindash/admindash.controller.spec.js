'use strict';

describe('Controller: AdmindashCtrl', function () {

  // load the controller's module
  beforeEach(module('ytcwebUirouteApp'));

  var AdmindashCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmindashCtrl = $controller('AdmindashCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
